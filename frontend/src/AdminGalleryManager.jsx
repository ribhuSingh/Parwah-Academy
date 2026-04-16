import React, { useEffect, useMemo, useState } from 'react'
import Button from './components/ui/button'
import Card from './components/ui/card'
import Input from './components/ui/input'
import Cropper from 'react-easy-crop'
import getCroppedImg from './utils/cropImage' 
import { useToast } from './components/ToastContext'

const API_BASE = '/api'

const EMPTY_FORMS = {
  committee: {
    _id: null,
    name: '',
    role: '',
    bio: '',
    category: '',
    imageUrl: '', 
  },
  gallery: {
    _id: null,
    src: '',
    alt: '',
    category: '',
    caption: '',
    order: 0,
  },
  events: {
    _id: null,
    title: '',
    description: '',
    eventDate: '',
    location: '',
    imageUrl: '', 
  },
}

const TABS = [
  { key: 'committee', label: 'Committee' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'events', label: 'Events' },
]

function SectionShell({ title, description, children, actions }) {
  return (
    <Card className="p-6 rounded-2xl shadow-sm border border-slate-200 bg-white h-full flex flex-col">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between shrink-0">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Admin Panel</p>
          <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        {actions ? <div className="flex gap-2">{actions}</div> : null}
      </div>
      {/* This wrapper is crucial: it takes the remaining height 
        and allows scrolling if the content is too long.
      */}
      <div className="flex-1 min-h-0">
        {children}
      </div>
    </Card>
  )
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-full px-4 py-2 text-sm font-medium transition',
        active
          ? 'bg-slate-900 text-white shadow-sm'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  )
}

function normalizeId(item) {
  return item?.id || item?._id || item?._id?.toString?.() || ''
}

export default function AdminGalleryManager({ token }) {
  const addToast = useToast()
  const [activeTab, setActiveTab] = useState('committee')
  const [loading, setLoading] = useState({ committee: true, gallery: true, events: true })
  const [error, setError] = useState({ committee: '', gallery: '', events: '' })
  const [submitting, setSubmitting] = useState({ committee: false, gallery: false, events: false })
  const [formError, setFormError] = useState({ committee: '', gallery: '', events: '' })
  const [committee, setCommittee] = useState([])
  const [gallery, setGallery] = useState([])
  const [events, setEvents] = useState([])
  const [forms, setForms] = useState(EMPTY_FORMS)
  
  // File and Cropper States
  const [file, setFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  
  // Registration Modal States
  const [showRegistrationsModal, setShowRegistrationsModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [eventRegistrations, setEventRegistrations] = useState([])
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [registrationsError, setRegistrationsError] = useState('')

  const authHeaders = useMemo(() => {
    const headers = {}
    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  }, [token])

  const fetchJson = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...authHeaders,
        ...(options.headers || {}),
      },
    })

    let data = null
    try {
      data = await res.json()
    } catch {
      data = null
    }

    if (!res.ok) {
      throw new Error(data?.error || data?.message || 'Request failed')
    }

    return data
  }

  const loadCommittee = async () => {
    setLoading(prev => ({ ...prev, committee: true }))
    setError(prev => ({ ...prev, committee: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/committee`, { method: 'GET', headers: {}})
      setCommittee(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, committee: err.message || 'Failed to load committee' }))
    } finally {
      setLoading(prev => ({ ...prev, committee: false }))
    }
  }

  const loadGallery = async () => {
    setLoading(prev => ({ ...prev, gallery: true }))
    setError(prev => ({ ...prev, gallery: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/gallery`, { method: 'GET', headers: {} })
      setGallery(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, gallery: err.message || 'Failed to load gallery' }))
    } finally {
      setLoading(prev => ({ ...prev, gallery: false }))
    }
  }

  const loadEvents = async () => {
    setLoading(prev => ({ ...prev, events: true }))
    setError(prev => ({ ...prev, events: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/events`, { method: 'GET', headers: {} })
      setEvents(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, events: err.message || 'Failed to load events' }))
    } finally {
      setLoading(prev => ({ ...prev, events: false }))
    }
  }

  useEffect(() => {
    loadCommittee()
    loadGallery()
    loadEvents()
  }, [])

  const resetImageState = () => {
    setImageSrc(null)
    setFile(null)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
  }

  const switchTab = (tabKey) => {
    setActiveTab(tabKey)
    resetImageState()
  }

  const resetForm = (section) => {
    setForms(prev => ({ ...prev, [section]: EMPTY_FORMS[section] }))
    setFormError(prev => ({ ...prev, [section]: '' }))
    resetImageState()
  }

  const handleChange = (section) => (e) => {
    const { name, value } = e.target
    setForms(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: name === 'order' ? Number(value) : value,
      },
    }))
  }

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      const reader = new FileReader()
      reader.addEventListener('load', () => setImageSrc(reader.result))
      reader.readAsDataURL(selectedFile)
    }
  }

  const editItem = (section, item) => {
    const id = normalizeId(item)
    resetImageState() 

    if (section === 'committee') {
      setForms(prev => ({
        ...prev,
        committee: {
          _id: id,
          name: item.name || '',
          role: item.role || '',
          bio: item.bio || '',
          category: item.category || '',
          imageUrl: item.imageUrl || '',
        },
      }))
    }

    if (section === 'gallery') {
      setForms(prev => ({
        ...prev,
        gallery: {
          _id: id,
          src: item.src || '',
          alt: item.alt || '',
          category: item.category || '',
          caption: item.caption || '',
          order: item.order ?? 0,
        },
      }))
    }

    if (section === 'events') {
      setForms(prev => ({
        ...prev,
        events: {
          _id: id,
          title: item.title || '',
          description: item.description || '',
          eventDate: item.eventDate ? String(item.eventDate).slice(0, 10) : '',
          location: item.location || '',
          imageUrl: item.imageUrl || '',
        },
      }))
    }

    setActiveTab(section)
  }

  const submitSection = async (section) => {
    setSubmitting(prev => ({ ...prev, [section]: true }))
    setFormError(prev => ({ ...prev, [section]: '' }))

    try {
      const form = forms[section]
      const isEdit = Boolean(form._id)
      let method = isEdit ? 'PATCH' : 'POST'
      let endpoint = isEdit
        ? `${API_BASE}/${section}/${form._id}`
        : `${API_BASE}/${section}`

      if (section === 'gallery' && !isEdit) {
        endpoint = `${API_BASE}/gallery/upload`
      }

      let payload = { ...form }
      delete payload._id

      if (section === 'events' && payload.eventDate) {
        payload = {
          ...payload,
          eventDate: new Date(payload.eventDate).toISOString(),
        }
      }

      const isImageUpload = (section === 'gallery' || section === 'committee' || section === 'events') && file;
      let fetchOptions = { method };

      if (isImageUpload) {
        const formData = new FormData()
        let fileToUpload = file;

        if (imageSrc && croppedAreaPixels) {
          try {
            const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            fileToUpload = new File([croppedBlob], `${section}-upload.jpg`, { type: "image/jpeg" });
          } catch (e) {
            console.error("Cropping failed, falling back to original file", e);
          }
        }

        formData.append('image', fileToUpload)
        
        Object.keys(payload).forEach(key => {
          if (key !== 'imageUrl') { 
            formData.append(key, payload[key] || '')
          }
        })
        
        fetchOptions.body = formData;
      } else {
        fetchOptions.body = JSON.stringify(payload);
        fetchOptions.headers = { 'Content-Type': 'application/json' };
      }

      const data = await fetchJson(endpoint, fetchOptions)

      if (section === 'committee') await loadCommittee()
      if (section === 'gallery') await loadGallery()
      if (section === 'events') await loadEvents()

      addToast(isEdit ? 'Item updated successfully!' : 'Item added successfully!', 'success')
      resetForm(section)
      return data
    } catch (err) {
      const errorMessage = err.message || 'Save failed'
      setFormError(prev => ({ ...prev, [section]: errorMessage }))
      addToast(errorMessage, 'error')
      throw err
    } finally {
      setSubmitting(prev => ({ ...prev, [section]: false }))
    }
  }

  const removeItem = async (section, id) => {
    const confirmed = window.confirm('Are you sure you want to delete this item?')
    if (!confirmed) return

    try {
      await fetchJson(`${API_BASE}/${section}/${id}`, { method: 'DELETE' })
      if (section === 'committee') await loadCommittee()
      if (section === 'gallery') await loadGallery()
      if (section === 'events') await loadEvents()
      addToast('Item deleted successfully.', 'success')
    } catch (err) {
      addToast(err.message || 'Delete failed', 'error')
    }
  }

  const viewRegistrations = async (event) => {
    setSelectedEvent(event)
    setShowRegistrationsModal(true)
    setLoadingRegistrations(true)
    setRegistrationsError('')
    setEventRegistrations([])

    try {
      const data = await fetchJson(`${API_BASE}/events/${normalizeId(event)}/registrations`, { method: 'GET' })
      setEventRegistrations(data)
    } catch (err) {
      const errorMessage = err.message || 'Failed to load registrations'
      setRegistrationsError(errorMessage)
      addToast(errorMessage, 'error')
    } finally {
      setLoadingRegistrations(false)
    }
  }

  const exportToCSV = () => {
    if (!eventRegistrations || eventRegistrations.length === 0) return

    const headers = ['Student Name', 'Phone', 'Email', 'Age', 'School', 'Registration Date']
    const rows = eventRegistrations.map(reg => [
      `"${(reg.studentName || '').replace(/"/g, '""')}"`,
      `"${(reg.phone || '').replace(/"/g, '""')}"`,
      `"${(reg.email || '').replace(/"/g, '""')}"`,
      reg.age || '',
      `"${(reg.schoolName || '').replace(/"/g, '""')}"`,
      `"${new Date(reg.registrationDate).toLocaleDateString()}"`
    ])

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${(selectedEvent?.title || 'event').replace(/\s+/g, '_')}_registrations.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderCropper = (aspectRatio) => {
    if (!imageSrc) return null;
    return (
      <div className="relative h-64 w-full mt-4 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onCropComplete={(croppedArea, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
          onZoomChange={setZoom}
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-11/12 max-w-xs bg-white/90 p-2 rounded-full flex gap-3 items-center shadow-lg">
          <span className="text-xs font-medium text-slate-700 ml-2">-</span>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            className="w-full accent-slate-900"
          />
          <span className="text-xs font-medium text-slate-700 mr-2">+</span>
        </div>
      </div>
    )
  }

  const renderCommittee = () => (
    // 🔥 Added items-start so the form doesn't stretch vertically to match the list height
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      {/* 🔥 Added sticky top-6 so the form stays in view even if the user scrolls the whole page */}
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.committee._id ? 'Edit Member' : 'Add Member'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Committee form</h3>
          </div>
          {forms.committee._id ? (
            <Button variant="ghost" onClick={() => resetForm('committee')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('committee')
          }}
        >
          <Field label="Upload Member Photo">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </Field>

          {renderCropper(1)}

          <Field label="Name">
            <Input name="name" value={forms.committee.name} onChange={handleChange('committee')} required />
          </Field>
          <Field label="Role">
            <Input name="role" value={forms.committee.role} onChange={handleChange('committee')} required />
          </Field>
          <Field label="Category">
            <Input name="category" value={forms.committee.category} onChange={handleChange('committee')} required />
          </Field>
          <Field label="Bio">
            <textarea
              name="bio"
              value={forms.committee.bio}
              onChange={handleChange('committee')}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>

          {formError.committee ? <p className="text-sm text-rose-700">{formError.committee}</p> : null}
          <Button type="submit" disabled={submitting.committee}>
            {submitting.committee ? (forms.committee._id ? 'Updating...' : 'Adding...') : (forms.committee._id ? 'Update Member' : 'Add Member')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Committee Members"
        description="Edit or delete the people shown on the public committee page."
      >
        {loading.committee ? (
          <p className="text-sm text-slate-600">Loading committee members...</p>
        ) : error.committee ? (
          <p className="text-sm text-rose-700">{error.committee}</p>
        ) : committee.length === 0 ? (
          <p className="text-sm text-slate-600">No committee members found.</p>
        ) : (
          /* 🔥 Added overflow-y-auto and max-h constraint for scrolling */
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {committee.map((member) => (
                <div key={normalizeId(member)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} className="aspect-square w-full object-cover" />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-slate-200 text-sm text-slate-500">
                      No image
                    </div>
                  )}
                  <div className="space-y-2 p-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">{member.name}</h4>
                      <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{member.category}</p>
                    <p className="line-clamp-4 text-sm text-slate-700">{member.bio}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('committee', member)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('committee', normalizeId(member))}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </div>
  )

  const renderGallery = () => (
    // 🔥 Added items-start
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      {/* 🔥 Added sticky top-6 */}
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.gallery._id ? 'Edit Image' : 'Add Image'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Gallery form</h3>
          </div>
          {forms.gallery._id ? (
            <Button variant="ghost" onClick={() => resetForm('gallery')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('gallery')
          }}
        >
          <Field label="Upload Image">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              required={!forms.gallery._id && !imageSrc}
            />
          </Field>

          {renderCropper(4 / 3)}

          <Field label="Alt Text">
            <Input name="alt" value={forms.gallery.alt} onChange={handleChange('gallery')} required />
          </Field>
          <Field label="Category">
            <Input name="category" value={forms.gallery.category} onChange={handleChange('gallery')} required />
          </Field>
          <Field label="Caption">
            <textarea
              name="caption"
              value={forms.gallery.caption}
              onChange={handleChange('gallery')}
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.gallery.order} onChange={handleChange('gallery')} />
          </Field>

          {formError.gallery ? <p className="text-sm text-rose-700">{formError.gallery}</p> : null}
          <Button type="submit" disabled={submitting.gallery}>
            {submitting.gallery ? (forms.gallery._id ? 'Updating...' : 'Adding...') : (forms.gallery._id ? 'Update Image' : 'Add Image')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Gallery Images"
        description="Manage the public gallery images, captions, order, and categories."
      >
        {loading.gallery ? (
          <p className="text-sm text-slate-600">Loading gallery images...</p>
        ) : error.gallery ? (
          <p className="text-sm text-rose-700">{error.gallery}</p>
        ) : gallery.length === 0 ? (
          <p className="text-sm text-slate-600">No gallery images found.</p>
        ) : (
          /* 🔥 Added overflow-y-auto and max-h constraint */
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {gallery.map((image) => (
                <div key={normalizeId(image)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">{image.alt}</h4>
                      <p className="text-sm text-slate-600">{image.category}</p>
                    </div>
                    {image.caption ? <p className="text-sm text-slate-700">{image.caption}</p> : null}
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {image.order}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('gallery', image)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('gallery', normalizeId(image))}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </div>
  )

  const renderEvents = () => (
    // 🔥 Added items-start
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      {/* 🔥 Added sticky top-6 */}
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.events._id ? 'Edit Event' : 'Add Event'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Event form</h3>
          </div>
          {forms.events._id ? (
            <Button variant="ghost" onClick={() => resetForm('events')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('events')
          }}
        >
          <Field label="Upload Event Image">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
            />
          </Field>

          {renderCropper(16 / 9)}

          <Field label="Title">
            <Input name="title" value={forms.events.title} onChange={handleChange('events')} required />
          </Field>
          <Field label="Description">
            <textarea
              name="description"
              value={forms.events.description}
              onChange={handleChange('events')}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Event Date">
            <Input type="date" name="eventDate" value={forms.events.eventDate} onChange={handleChange('events')} required />
          </Field>
          <Field label="Location">
            <Input name="location" value={forms.events.location} onChange={handleChange('events')} required />
          </Field>

          {formError.events ? <p className="text-sm text-rose-700">{formError.events}</p> : null}
          <Button type="submit" disabled={submitting.events}>
            {submitting.events ? (forms.events._id ? 'Updating...' : 'Adding...') : (forms.events._id ? 'Update Event' : 'Add Event')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Events"
        description="Create, update, or remove events shown on the site."
      >
        {loading.events ? (
          <p className="text-sm text-slate-600">Loading events...</p>
        ) : error.events ? (
          <p className="text-sm text-rose-700">{error.events}</p>
        ) : events.length === 0 ? (
          <p className="text-sm text-slate-600">No events found.</p>
        ) : (
          /* 🔥 Added overflow-y-auto and max-h constraint */
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <div key={normalizeId(event)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  {event.imageUrl ? (
                    <img src={event.imageUrl} alt={event.title} className="aspect-[16/9] w-full object-cover" />
                  ) : (
                    <div className="flex aspect-[16/9] w-full items-center justify-center bg-slate-200 text-sm text-slate-500">
                      No image
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-slate-950">{event.title}</h4>
                    <p className="mt-2 text-sm text-slate-700">{event.description}</p>
                    <div className="mt-3 space-y-1 text-xs text-slate-500">
                      <p>Date: {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : '—'}</p>
                      <p>Location: {event.location}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('events', event)}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => viewRegistrations(event)}>Registrations</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('events', normalizeId(event))}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </div>
  )

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Admin Dashboard</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">Manage site content from one place</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Use the tabs below to add, edit, and delete committee members, gallery images, and events.
              </p>
            </div>
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
              Signed in with admin access
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {TABS.map(tab => (
              <TabButton key={tab.key} active={activeTab === tab.key} onClick={() => switchTab(tab.key)}>
                {tab.label}
              </TabButton>
            ))}
          </div>
        </div>

        {activeTab === 'committee' ? renderCommittee() : null}
        {activeTab === 'gallery' ? renderGallery() : null}
        {activeTab === 'events' ? renderEvents() : null}
      </div>

      {/* Registrations Modal */}
      {showRegistrationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-slate-50 rounded-t-xl">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Registrations: {selectedEvent?.title}
                </h3>
                <p className="text-sm text-slate-500">Total Participants: {eventRegistrations.length}</p>
              </div>
              <div className="flex items-center gap-4">
                {eventRegistrations.length > 0 && (
                  <Button variant="outline" size="sm" onClick={exportToCSV} className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50">
                    Export CSV
                  </Button>
                )}
                <button onClick={() => setShowRegistrationsModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {loadingRegistrations ? (
                <p className="text-slate-600 text-center py-8">Loading registrations...</p>
              ) : registrationsError ? (
                <p className="text-rose-600 text-center py-8">{registrationsError}</p>
              ) : eventRegistrations.length === 0 ? (
                <p className="text-slate-600 text-center py-8">No registrations found for this event yet.</p>
              ) : (
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Student Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact Details</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">School</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reg. Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {eventRegistrations.map(reg => (
                        <tr key={reg._id} className="hover:bg-slate-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{reg.studentName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            <div className="font-medium">{reg.phone}</div>
                            {reg.email && <div className="text-xs text-slate-400 mt-0.5">{reg.email}</div>}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{reg.age}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{reg.schoolName || '-'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(reg.registrationDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}