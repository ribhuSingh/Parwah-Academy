import React, { useEffect, useMemo, useState } from 'react'
import Button from './components/ui/button'
import Card from './components/ui/card'
import Input from './components/ui/input'
import Cropper from 'react-easy-crop'
import getCroppedImg from './utils/cropImage' 
import { useToast } from './components/ToastContext'

const API_BASE = '/api'

const SECTION_ENDPOINT = {
  committee: 'committee',
  gallery: 'gallery',
  media: 'media',
  medicalServices: 'medical-services',
  events: 'events',
  heroSlides: 'home-slides',
  programs: 'programs',
  footprint: 'footprint',
  getInvolved: 'get-involved',
}

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
  media: {
    _id: null,
    src: '',
    alt: '',
    category: '',
    caption: '',
    order: 0,
  },
  medicalServices: {
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
  heroSlides: {
    _id: null,
    src: '',
    alt: '',
    title: '',
    description: '',
    order: 0,
  },
  programs: {
    _id: null,
    title: '',
    subtitle: '',
    description: '',
    iconKey: '',
    colorClass: '',
    order: 0,
  },
  footprint: {
    _id: null,
    title: '',
    description: '',
    iconKey: '',
    order: 0,
  },
  getInvolved: {
    _id: null,
    title: '',
    description: '',
    iconKey: '',
    colorClass: '',
    order: 0,
  },
}

const TABS = [
  { key: 'committee', label: 'Committee' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'media', label: 'Media' },
  { key: 'medicalServices', label: 'Medical Services' },
  { key: 'events', label: 'Events' },
  { key: 'heroSlides', label: 'Home Backgrounds' },
  { key: 'programs', label: 'Our Programs' },
  { key: 'footprint', label: 'Our Footprint' },
  { key: 'getInvolved', label: 'Get Involved' },
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

  const uploadHint = 'Tip: to select multiple images, hold Ctrl or Shift and select all files at once.'

function normalizeId(item) {
  return item?.id || item?._id || item?._id?.toString?.() || ''
}

export default function AdminGalleryManager({ token }) {
  const addToast = useToast()
  const [activeTab, setActiveTab] = useState('committee')
  const [loading, setLoading] = useState({
    committee: true,
    gallery: true,
    media: true,
    medicalServices: true,
    events: true,
    heroSlides: true,
    programs: true,
    footprint: true,
    getInvolved: true,
  })
  const [error, setError] = useState({
    committee: '',
    gallery: '',
    media: '',
    medicalServices: '',
    events: '',
    heroSlides: '',
    programs: '',
    footprint: '',
    getInvolved: '',
  })
  const [submitting, setSubmitting] = useState({
    committee: false,
    gallery: false,
    media: false,
    medicalServices: false,
    events: false,
    heroSlides: false,
    programs: false,
    footprint: false,
    getInvolved: false,
  })
  const [formError, setFormError] = useState({
    committee: '',
    gallery: '',
    media: '',
    medicalServices: '',
    events: '',
    heroSlides: '',
    programs: '',
    footprint: '',
    getInvolved: '',
  })
  const [committee, setCommittee] = useState([])
  const [gallery, setGallery] = useState([])
  const [media, setMedia] = useState([])
  const [medicalServices, setMedicalServices] = useState([])
  const [events, setEvents] = useState([])
  const [heroSlides, setHeroSlides] = useState([])
  const [programs, setPrograms] = useState([])
  const [footprint, setFootprint] = useState([])
  const [getInvolved, setGetInvolved] = useState([])
  const [forms, setForms] = useState(EMPTY_FORMS)
  
  // File and Cropper States
  const [files, setFiles] = useState([])
  const [cropIndex, setCropIndex] = useState(0)
  const [croppedFiles, setCroppedFiles] = useState([]) // array aligned to `files`
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

  const loadMedia = async () => {
    setLoading(prev => ({ ...prev, media: true }))
    setError(prev => ({ ...prev, media: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/media`, { method: 'GET', headers: {} })
      setMedia(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, media: err.message || 'Failed to load media' }))
    } finally {
      setLoading(prev => ({ ...prev, media: false }))
    }
  }

  const loadMedicalServices = async () => {
    setLoading(prev => ({ ...prev, medicalServices: true }))
    setError(prev => ({ ...prev, medicalServices: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/medical-services`, { method: 'GET', headers: {} })
      setMedicalServices(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, medicalServices: err.message || 'Failed to load medical services' }))
    } finally {
      setLoading(prev => ({ ...prev, medicalServices: false }))
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

  const loadHeroSlides = async () => {
    setLoading(prev => ({ ...prev, heroSlides: true }))
    setError(prev => ({ ...prev, heroSlides: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/home-slides`, { method: 'GET', headers: {} })
      setHeroSlides(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, heroSlides: err.message || 'Failed to load home backgrounds' }))
    } finally {
      setLoading(prev => ({ ...prev, heroSlides: false }))
    }
  }

  const loadPrograms = async () => {
    setLoading(prev => ({ ...prev, programs: true }))
    setError(prev => ({ ...prev, programs: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/programs`, { method: 'GET', headers: {} })
      setPrograms(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, programs: err.message || 'Failed to load programs' }))
    } finally {
      setLoading(prev => ({ ...prev, programs: false }))
    }
  }

  const loadFootprint = async () => {
    setLoading(prev => ({ ...prev, footprint: true }))
    setError(prev => ({ ...prev, footprint: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/footprint`, { method: 'GET', headers: {} })
      setFootprint(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, footprint: err.message || 'Failed to load footprint' }))
    } finally {
      setLoading(prev => ({ ...prev, footprint: false }))
    }
  }

  const loadGetInvolved = async () => {
    setLoading(prev => ({ ...prev, getInvolved: true }))
    setError(prev => ({ ...prev, getInvolved: '' }))
    try {
      const data = await fetchJson(`${API_BASE}/get-involved`, { method: 'GET', headers: {} })
      setGetInvolved(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(prev => ({ ...prev, getInvolved: err.message || 'Failed to load get involved content' }))
    } finally {
      setLoading(prev => ({ ...prev, getInvolved: false }))
    }
  }

  useEffect(() => {
    loadCommittee()
    loadGallery()
    loadMedia()
    loadMedicalServices()
    loadEvents()
    loadHeroSlides()
    loadPrograms()
    loadFootprint()
    loadGetInvolved()
  }, [])

  const resetImageState = () => {
    setImageSrc(null)
    setFiles([])
    setCroppedFiles([])
    setCropIndex(0)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)
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

  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', reject)
      reader.readAsDataURL(file)
    })

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files)
      setFiles(selected)
      setCroppedFiles(new Array(selected.length).fill(null))
      setCropIndex(0)
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)

      try {
        const firstSrc = await readFileAsDataUrl(selected[0])
        setImageSrc(firstSrc)
      } catch (err) {
        console.error(err)
        setImageSrc(null)
      }
    }
  }

  const saveCurrentCrop = async () => {
    if (!files || files.length === 0) return
    if (!imageSrc || !croppedAreaPixels) return

    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      const original = files[cropIndex]
      const filename = original?.name ? original.name.replace(/\.[^.]+$/, '') : `image-${cropIndex + 1}`
      const croppedFile = new File([croppedBlob], `${filename}-cropped.jpg`, { type: 'image/jpeg' })

      setCroppedFiles((prev) => {
        const next = Array.isArray(prev) ? [...prev] : []
        next[cropIndex] = croppedFile
        return next
      })
    } catch (err) {
      console.error('Failed to crop image', err)
    }
  }

  const goToCropIndex = async (nextIndex) => {
    if (!files || files.length === 0) return
    if (nextIndex < 0 || nextIndex >= files.length) return

    await saveCurrentCrop()

    setCropIndex(nextIndex)
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setCroppedAreaPixels(null)

    try {
      const nextSrc = await readFileAsDataUrl(files[nextIndex])
      setImageSrc(nextSrc)
    } catch (err) {
      console.error(err)
      setImageSrc(null)
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

    if (section === 'media') {
      setForms(prev => ({
        ...prev,
        media: {
          _id: id,
          src: item.src || '',
          alt: item.alt || '',
          category: item.category || '',
          caption: item.caption || '',
          order: item.order ?? 0,
        },
      }))
    }

    if (section === 'medicalServices') {
      setForms(prev => ({
        ...prev,
        medicalServices: {
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
          imageUrl: (Array.isArray(item.imageUrls) && item.imageUrls.length > 0) ? item.imageUrls[0] : (item.imageUrl || ''),
        },
      }))
    }

    if (section === 'heroSlides') {
      setForms(prev => ({
        ...prev,
        heroSlides: {
          _id: id,
          src: item.src || '',
          alt: item.alt || '',
          title: item.title || '',
          description: item.description || '',
          order: item.order ?? 0,
        },
      }))
    }

    if (section === 'programs') {
      setForms(prev => ({
        ...prev,
        programs: {
          _id: id,
          title: item.title || '',
          subtitle: item.subtitle || '',
          description: item.description || '',
          iconKey: item.iconKey || '',
          colorClass: item.colorClass || '',
          order: item.order ?? 0,
        },
      }))
    }

    if (section === 'footprint') {
      setForms(prev => ({
        ...prev,
        footprint: {
          _id: id,
          title: item.title || '',
          description: item.description || '',
          iconKey: item.iconKey || '',
          order: item.order ?? 0,
        },
      }))
    }

    if (section === 'getInvolved') {
      setForms(prev => ({
        ...prev,
        getInvolved: {
          _id: id,
          title: item.title || '',
          description: item.description || '',
          iconKey: item.iconKey || '',
          colorClass: item.colorClass || '',
          order: item.order ?? 0,
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
      const endpointBase = SECTION_ENDPOINT[section] || section
      let endpoint = isEdit
        ? `${API_BASE}/${endpointBase}/${form._id}`
        : `${API_BASE}/${endpointBase}`

      if (!isEdit && (section === 'gallery' || section === 'media' || section === 'medicalServices')) {
        endpoint = `${API_BASE}/${endpointBase}/upload`
      }

      let payload = { ...form }
      delete payload._id

      if (section === 'events' && payload.eventDate) {
        payload = {
          ...payload,
          eventDate: new Date(payload.eventDate).toISOString(),
        }
      }

      const supportsImages =
        section === 'gallery' ||
        section === 'media' ||
        section === 'medicalServices' ||
        section === 'committee' ||
        section === 'events' ||
        section === 'heroSlides'

      const hasFiles = Array.isArray(files) && files.length > 0
      const isImageUpload = supportsImages && hasFiles
      let fetchOptions = { method }

      if (isImageUpload) {
        const formData = new FormData()

        const allowMulti =
          section === 'gallery' || section === 'media' || section === 'medicalServices' || section === 'events'

        if (allowMulti && files.length > 1) {
          // Make sure we don't lose the current crop before upload.
          await saveCurrentCrop()
        }

        const selectedFiles = allowMulti ? files : [files[0]]

        if (selectedFiles.length === 1) {
          let fileToUpload = selectedFiles[0]

          if (imageSrc && croppedAreaPixels) {
            try {
              const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
              fileToUpload = new File([croppedBlob], `${section}-upload.jpg`, { type: 'image/jpeg' })
            } catch (e) {
              console.error('Cropping failed, falling back to original file', e)
            }
          }

          formData.append('image', fileToUpload)
        } else {
          selectedFiles.forEach((f, idx) => {
            const cropped = Array.isArray(croppedFiles) ? croppedFiles[idx] : null
            formData.append('images', cropped || f)
          })
        }
        
        Object.keys(payload).forEach(key => {
          if (key !== 'imageUrl' && key !== 'src') {
            formData.append(key, payload[key] || '')
          }
        })
        
        fetchOptions.body = formData
      } else {
        fetchOptions.body = JSON.stringify(payload)
        fetchOptions.headers = { 'Content-Type': 'application/json' }
      }

      const data = await fetchJson(endpoint, fetchOptions)

      if (section === 'committee') await loadCommittee()
      if (section === 'gallery') await loadGallery()
      if (section === 'media') await loadMedia()
      if (section === 'medicalServices') await loadMedicalServices()
      if (section === 'events') await loadEvents()
      if (section === 'heroSlides') await loadHeroSlides()
      if (section === 'programs') await loadPrograms()
      if (section === 'footprint') await loadFootprint()
      if (section === 'getInvolved') await loadGetInvolved()

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
      const endpointBase = SECTION_ENDPOINT[section] || section
      await fetchJson(`${API_BASE}/${endpointBase}/${id}`, { method: 'DELETE' })
      if (section === 'committee') await loadCommittee()
      if (section === 'gallery') await loadGallery()
      if (section === 'media') await loadMedia()
      if (section === 'medicalServices') await loadMedicalServices()
      if (section === 'events') await loadEvents()
      if (section === 'heroSlides') await loadHeroSlides()
      if (section === 'programs') await loadPrograms()
      if (section === 'footprint') await loadFootprint()
      if (section === 'getInvolved') await loadGetInvolved()
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

  const renderMultiCropNav = () => {
    if (!files || files.length <= 1) return null

    return (
      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="text-xs font-medium text-slate-700">
          Image {cropIndex + 1} of {files.length}
          {croppedFiles?.[cropIndex] ? <span className="ml-2 text-emerald-700">Cropped</span> : null}
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => goToCropIndex(cropIndex - 1)}
            disabled={cropIndex === 0}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => goToCropIndex(cropIndex + 1)}
            disabled={cropIndex === files.length - 1}
          >
            Next
          </Button>
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
              multiple
              onChange={onFileChange}
              required={!forms.gallery._id && files.length === 0}
            />
          </Field>
          {files.length > 0 ? (
            <p className="text-xs text-slate-500">Selected: {files.length} file(s). {files.length > 1 ? uploadHint : null}</p>
          ) : (
            <p className="text-xs text-slate-500">{uploadHint}</p>
          )}

          {renderCropper(4 / 3)}
          {renderMultiCropNav()}

          <Field label="Alt Text (optional for multiple uploads)">
            <Input name="alt" value={forms.gallery.alt} onChange={handleChange('gallery')} required={files.length <= 1} />
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
                  <div className="relative">
                    <img
                      src={(Array.isArray(image.imageUrls) && image.imageUrls.length > 0) ? image.imageUrls[0] : image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {Array.isArray(image.imageUrls) && image.imageUrls.length > 1 ? (
                      <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                        {image.imageUrls.length} photos
                      </div>
                    ) : null}
                  </div>
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

  const renderMedia = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.media._id ? 'Edit Image' : 'Add Image'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Media form</h3>
          </div>
          {forms.media._id ? (
            <Button variant="ghost" onClick={() => resetForm('media')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('media')
          }}
        >
          <Field label="Upload Image(s)">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
              required={!forms.media._id && files.length === 0}
            />
          </Field>
          {files.length > 0 ? (
            <p className="text-xs text-slate-500">Selected: {files.length} file(s). {files.length > 1 ? uploadHint : null}</p>
          ) : (
            <p className="text-xs text-slate-500">{uploadHint}</p>
          )}

          {renderCropper(4 / 3)}
          {renderMultiCropNav()}

          <Field label="Alt Text (optional for multiple uploads)">
            <Input name="alt" value={forms.media.alt} onChange={handleChange('media')} />
          </Field>
          <Field label="Category">
            <Input name="category" value={forms.media.category} onChange={handleChange('media')} required />
          </Field>
          <Field label="Caption">
            <textarea
              name="caption"
              value={forms.media.caption}
              onChange={handleChange('media')}
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.media.order} onChange={handleChange('media')} />
          </Field>

          {formError.media ? <p className="text-sm text-rose-700">{formError.media}</p> : null}
          <Button type="submit" disabled={submitting.media}>
            {submitting.media ? (forms.media._id ? 'Updating...' : 'Adding...') : (forms.media._id ? 'Update Image' : 'Add Image')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Media Images"
        description="Manage the public media gallery images, captions, order, and categories."
      >
        {loading.media ? (
          <p className="text-sm text-slate-600">Loading media images...</p>
        ) : error.media ? (
          <p className="text-sm text-rose-700">{error.media}</p>
        ) : media.length === 0 ? (
          <p className="text-sm text-slate-600">No media images found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {media.map((image) => (
                <div key={normalizeId(image)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="relative">
                    <img
                      src={(Array.isArray(image.imageUrls) && image.imageUrls.length > 0) ? image.imageUrls[0] : image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {Array.isArray(image.imageUrls) && image.imageUrls.length > 1 ? (
                      <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                        {image.imageUrls.length} photos
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">{image.alt}</h4>
                      <p className="text-sm text-slate-600">{image.category}</p>
                    </div>
                    {image.caption ? <p className="text-sm text-slate-700">{image.caption}</p> : null}
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {image.order}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('media', image)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('media', normalizeId(image))}>
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

  const renderMedicalServices = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.medicalServices._id ? 'Edit Image' : 'Add Image'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Medical services form</h3>
          </div>
          {forms.medicalServices._id ? (
            <Button variant="ghost" onClick={() => resetForm('medicalServices')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('medicalServices')
          }}
        >
          <Field label="Upload Image(s)">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
              required={!forms.medicalServices._id && files.length === 0}
            />
          </Field>
          {files.length > 0 ? (
            <p className="text-xs text-slate-500">Selected: {files.length} file(s). {files.length > 1 ? uploadHint : null}</p>
          ) : (
            <p className="text-xs text-slate-500">{uploadHint}</p>
          )}

          {renderCropper(4 / 3)}
          {renderMultiCropNav()}

          <Field label="Alt Text (optional for multiple uploads)">
            <Input name="alt" value={forms.medicalServices.alt} onChange={handleChange('medicalServices')} />
          </Field>
          <Field label="Category">
            <Input name="category" value={forms.medicalServices.category} onChange={handleChange('medicalServices')} required />
          </Field>
          <Field label="Caption">
            <textarea
              name="caption"
              value={forms.medicalServices.caption}
              onChange={handleChange('medicalServices')}
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.medicalServices.order} onChange={handleChange('medicalServices')} />
          </Field>

          {formError.medicalServices ? <p className="text-sm text-rose-700">{formError.medicalServices}</p> : null}
          <Button type="submit" disabled={submitting.medicalServices}>
            {submitting.medicalServices ? (forms.medicalServices._id ? 'Updating...' : 'Adding...') : (forms.medicalServices._id ? 'Update Image' : 'Add Image')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Medical Services Images"
        description="Manage the public medical services images, captions, order, and categories."
      >
        {loading.medicalServices ? (
          <p className="text-sm text-slate-600">Loading medical services images...</p>
        ) : error.medicalServices ? (
          <p className="text-sm text-rose-700">{error.medicalServices}</p>
        ) : medicalServices.length === 0 ? (
          <p className="text-sm text-slate-600">No medical services images found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {medicalServices.map((image) => (
                <div key={normalizeId(image)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <div className="relative">
                    <img
                      src={(Array.isArray(image.imageUrls) && image.imageUrls.length > 0) ? image.imageUrls[0] : image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {Array.isArray(image.imageUrls) && image.imageUrls.length > 1 ? (
                      <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                        {image.imageUrls.length} photos
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-2 p-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">{image.alt}</h4>
                      <p className="text-sm text-slate-600">{image.category}</p>
                    </div>
                    {image.caption ? <p className="text-sm text-slate-700">{image.caption}</p> : null}
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {image.order}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('medicalServices', image)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('medicalServices', normalizeId(image))}>
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
          <Field label="Upload Event Image(s)">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onFileChange}
            />
          </Field>
          {files.length > 0 ? (
            <p className="text-xs text-slate-500">Selected: {files.length} file(s). {files.length > 1 ? uploadHint : null}</p>
          ) : (
            <p className="text-xs text-slate-500">{uploadHint}</p>
          )}

          {renderCropper(16 / 9)}
          {renderMultiCropNav()}

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
                  {(Array.isArray(event.imageUrls) && event.imageUrls.length > 0) || event.imageUrl ? (
                    <div className="relative">
                      <img
                        src={(Array.isArray(event.imageUrls) && event.imageUrls.length > 0) ? event.imageUrls[0] : event.imageUrl}
                        alt={event.title}
                        className="aspect-[16/9] w-full object-cover"
                      />
                      {Array.isArray(event.imageUrls) && event.imageUrls.length > 1 ? (
                        <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm backdrop-blur">
                          {event.imageUrls.length} photos
                        </div>
                      ) : null}
                    </div>
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

  const renderHeroSlides = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.heroSlides._id ? 'Edit Slide' : 'Add Slide'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Home background form</h3>
          </div>
          {forms.heroSlides._id ? (
            <Button variant="ghost" onClick={() => resetForm('heroSlides')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('heroSlides')
          }}
        >
          <Field label="Upload Background Image">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              required={!forms.heroSlides._id && files.length === 0}
            />
          </Field>

          {renderCropper(16 / 9)}

          <Field label="Title">
            <Input name="title" value={forms.heroSlides.title} onChange={handleChange('heroSlides')} required />
          </Field>
          <Field label="Description">
            <textarea
              name="description"
              value={forms.heroSlides.description}
              onChange={handleChange('heroSlides')}
              required
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Alt Text">
            <Input name="alt" value={forms.heroSlides.alt} onChange={handleChange('heroSlides')} required />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.heroSlides.order} onChange={handleChange('heroSlides')} />
          </Field>

          {formError.heroSlides ? <p className="text-sm text-rose-700">{formError.heroSlides}</p> : null}
          <Button type="submit" disabled={submitting.heroSlides}>
            {submitting.heroSlides ? (forms.heroSlides._id ? 'Updating...' : 'Adding...') : (forms.heroSlides._id ? 'Update Slide' : 'Add Slide')}
          </Button>
        </form>
      </Card>

      <SectionShell
        title="Home Backgrounds"
        description="Manage the hero background slides shown on the homepage."
      >
        {loading.heroSlides ? (
          <p className="text-sm text-slate-600">Loading home backgrounds...</p>
        ) : error.heroSlides ? (
          <p className="text-sm text-rose-700">{error.heroSlides}</p>
        ) : heroSlides.length === 0 ? (
          <p className="text-sm text-slate-600">No slides found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {heroSlides.map((slide) => (
                <div key={normalizeId(slide)} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
                  <img src={slide.src} alt={slide.alt} className="aspect-[16/9] w-full object-cover" />
                  <div className="space-y-2 p-4">
                    <div>
                      <h4 className="text-base font-semibold text-slate-950">{slide.title}</h4>
                      <p className="text-sm text-slate-700">{slide.description}</p>
                    </div>
                    <p className="text-xs text-slate-500">Alt: {slide.alt}</p>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {slide.order}</p>
                    <div className="flex gap-2 pt-2">
                      <Button variant="ghost" size="sm" onClick={() => editItem('heroSlides', slide)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => removeItem('heroSlides', normalizeId(slide))}>
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

  const renderPrograms = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.programs._id ? 'Edit Item' : 'Add Item'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Programs form</h3>
          </div>
          {forms.programs._id ? (
            <Button variant="ghost" onClick={() => resetForm('programs')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('programs')
          }}
        >
          <Field label="Title">
            <Input name="title" value={forms.programs.title} onChange={handleChange('programs')} required />
          </Field>
          <Field label="Subtitle (optional)">
            <Input name="subtitle" value={forms.programs.subtitle} onChange={handleChange('programs')} />
          </Field>
          <Field label="Description">
            <textarea
              name="description"
              value={forms.programs.description}
              onChange={handleChange('programs')}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Icon Key (optional)">
            <Input name="iconKey" value={forms.programs.iconKey} onChange={handleChange('programs')} />
          </Field>
          <Field label="Color Class (optional)">
            <Input name="colorClass" value={forms.programs.colorClass} onChange={handleChange('programs')} />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.programs.order} onChange={handleChange('programs')} />
          </Field>

          {formError.programs ? <p className="text-sm text-rose-700">{formError.programs}</p> : null}
          <Button type="submit" disabled={submitting.programs}>
            {submitting.programs ? (forms.programs._id ? 'Updating...' : 'Adding...') : (forms.programs._id ? 'Update Item' : 'Add Item')}
          </Button>
        </form>
      </Card>

      <SectionShell title="Programs" description="Manage items shown on the Our Programs page.">
        {loading.programs ? (
          <p className="text-sm text-slate-600">Loading programs...</p>
        ) : error.programs ? (
          <p className="text-sm text-rose-700">{error.programs}</p>
        ) : programs.length === 0 ? (
          <p className="text-sm text-slate-600">No program items found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {programs.map((item) => (
                <div key={normalizeId(item)} className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm p-4 space-y-2">
                  <div>
                    <h4 className="text-base font-semibold text-slate-950">{item.title}</h4>
                    {item.subtitle ? <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mt-1">{item.subtitle}</p> : null}
                  </div>
                  <p className="text-sm text-slate-700">{item.description}</p>
                  <p className="text-xs text-slate-500">Icon: {item.iconKey || '-'}</p>
                  <p className="text-xs text-slate-500">Color: {item.colorClass || '-'}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {item.order}</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" onClick={() => editItem('programs', item)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeItem('programs', normalizeId(item))}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </div>
  )

  const renderFootprint = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.footprint._id ? 'Edit Item' : 'Add Item'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Footprint form</h3>
          </div>
          {forms.footprint._id ? (
            <Button variant="ghost" onClick={() => resetForm('footprint')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('footprint')
          }}
        >
          <Field label="Title">
            <Input name="title" value={forms.footprint.title} onChange={handleChange('footprint')} required />
          </Field>
          <Field label="Description">
            <textarea
              name="description"
              value={forms.footprint.description}
              onChange={handleChange('footprint')}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Icon Key (optional)">
            <Input name="iconKey" value={forms.footprint.iconKey} onChange={handleChange('footprint')} />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.footprint.order} onChange={handleChange('footprint')} />
          </Field>

          {formError.footprint ? <p className="text-sm text-rose-700">{formError.footprint}</p> : null}
          <Button type="submit" disabled={submitting.footprint}>
            {submitting.footprint ? (forms.footprint._id ? 'Updating...' : 'Adding...') : (forms.footprint._id ? 'Update Item' : 'Add Item')}
          </Button>
        </form>
      </Card>

      <SectionShell title="Footprint" description="Manage items shown on the Our Footprint page.">
        {loading.footprint ? (
          <p className="text-sm text-slate-600">Loading footprint...</p>
        ) : error.footprint ? (
          <p className="text-sm text-rose-700">{error.footprint}</p>
        ) : footprint.length === 0 ? (
          <p className="text-sm text-slate-600">No footprint items found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {footprint.map((item) => (
                <div key={normalizeId(item)} className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm p-4 space-y-2">
                  <h4 className="text-base font-semibold text-slate-950">{item.title}</h4>
                  <p className="text-sm text-slate-700">{item.description}</p>
                  <p className="text-xs text-slate-500">Icon: {item.iconKey || '-'}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {item.order}</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" onClick={() => editItem('footprint', item)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeItem('footprint', normalizeId(item))}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionShell>
    </div>
  )

  const renderGetInvolved = () => (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
      <Card className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sticky top-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {forms.getInvolved._id ? 'Edit Item' : 'Add Item'}
            </p>
            <h3 className="text-xl font-semibold text-slate-950">Get involved form</h3>
          </div>
          {forms.getInvolved._id ? (
            <Button variant="ghost" onClick={() => resetForm('getInvolved')}>Cancel edit</Button>
          ) : null}
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault()
            await submitSection('getInvolved')
          }}
        >
          <Field label="Title">
            <Input name="title" value={forms.getInvolved.title} onChange={handleChange('getInvolved')} required />
          </Field>
          <Field label="Description">
            <textarea
              name="description"
              value={forms.getInvolved.description}
              onChange={handleChange('getInvolved')}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-0 transition focus:border-slate-900"
            />
          </Field>
          <Field label="Icon Key (optional)">
            <Input name="iconKey" value={forms.getInvolved.iconKey} onChange={handleChange('getInvolved')} />
          </Field>
          <Field label="Color Class (optional)">
            <Input name="colorClass" value={forms.getInvolved.colorClass} onChange={handleChange('getInvolved')} />
          </Field>
          <Field label="Order" hint="Lower numbers appear first.">
            <Input type="number" name="order" value={forms.getInvolved.order} onChange={handleChange('getInvolved')} />
          </Field>

          {formError.getInvolved ? <p className="text-sm text-rose-700">{formError.getInvolved}</p> : null}
          <Button type="submit" disabled={submitting.getInvolved}>
            {submitting.getInvolved ? (forms.getInvolved._id ? 'Updating...' : 'Adding...') : (forms.getInvolved._id ? 'Update Item' : 'Add Item')}
          </Button>
        </form>
      </Card>

      <SectionShell title="Get Involved" description="Manage content shown on the Get Involved page.">
        {loading.getInvolved ? (
          <p className="text-sm text-slate-600">Loading get involved content...</p>
        ) : error.getInvolved ? (
          <p className="text-sm text-rose-700">{error.getInvolved}</p>
        ) : getInvolved.length === 0 ? (
          <p className="text-sm text-slate-600">No get involved items found.</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-auto pr-3 -mr-3 pb-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {getInvolved.map((item) => (
                <div key={normalizeId(item)} className="rounded-2xl border border-slate-200 bg-slate-50 shadow-sm p-4 space-y-2">
                  <h4 className="text-base font-semibold text-slate-950">{item.title}</h4>
                  <p className="text-sm text-slate-700">{item.description}</p>
                  <p className="text-xs text-slate-500">Icon: {item.iconKey || '-'}</p>
                  <p className="text-xs text-slate-500">Color: {item.colorClass || '-'}</p>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Order: {item.order}</p>
                  <div className="flex gap-2 pt-2">
                    <Button variant="ghost" size="sm" onClick={() => editItem('getInvolved', item)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => removeItem('getInvolved', normalizeId(item))}>Delete</Button>
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
                Use the tabs below to add, edit, and delete the site content, photos, and announcements.
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
        {activeTab === 'media' ? renderMedia() : null}
        {activeTab === 'medicalServices' ? renderMedicalServices() : null}
        {activeTab === 'events' ? renderEvents() : null}
        {activeTab === 'heroSlides' ? renderHeroSlides() : null}
        {activeTab === 'programs' ? renderPrograms() : null}
        {activeTab === 'footprint' ? renderFootprint() : null}
        {activeTab === 'getInvolved' ? renderGetInvolved() : null}
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
