import React from 'react'

export default function PrivacyPolicy() {
  return (
    <main className="shell py-12 md:py-20">
      <div className="section-heading">
        <p className="eyebrow">Legal</p>
        <h2>Privacy Policy</h2>
        <p className="max-w-2xl">
          Welcome to Parwah Academy. Your privacy is important to us. This Privacy Policy explains how we collect, use, and
          protect your information when you use our website.
        </p>
      </div>

      <div className="max-w-3xl space-y-6 text-slate-700">
        <p>By using our website, you agree to the terms mentioned in this Privacy Policy.</p>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">1. Information We Collect</h3>
          <p>We may collect the following information when you use our website:</p>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Messages submitted through forms</li>
            <li>Basic device/browser information</li>
            <li>Cookies and usage data</li>
          </ul>
          <p>You may choose not to provide personal information, but some features of the website may not work properly.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">2. How We Use Your Information</h3>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Contact students and users</li>
            <li>Respond to queries and support requests</li>
            <li>Share updates related to courses, programs, or events</li>
            <li>Improve website performance and user experience</li>
            <li>Maintain website security and prevent misuse</li>
          </ul>
          <p>We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">3. Cookies</h3>
          <p>Our website may use cookies to improve functionality and user experience.</p>
          <p>Cookies help us understand:</p>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Website traffic</li>
            <li>User preferences</li>
            <li>Most visited pages</li>
          </ul>
          <p>You can disable cookies anytime through your browser settings.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">4. Third-Party Services</h3>
          <p>We may use trusted third-party services such as:</p>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Google Analytics</li>
            <li>YouTube Embeds</li>
            <li>Firebase</li>
            <li>Payment Gateways (if applicable)</li>
          </ul>
          <p>These services may collect limited technical information according to their own privacy policies.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">5. Data Security</h3>
          <p>We take reasonable steps to protect your information from unauthorized access, misuse, or disclosure.</p>
          <p>However, no internet transmission is completely secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">6. Children's Privacy</h3>
          <p>Parwah Academy does not knowingly collect personal information from children under the age of 13 without parental consent.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">7. Your Rights</h3>
          <p>You may request to:</p>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Access your information</li>
            <li>Update your information</li>
            <li>Delete your information</li>
            <li>Stop receiving emails or updates</li>
          </ul>
          <p>For any such request, contact us using the details below.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">8. External Links</h3>
          <p>
            Our website may contain links to external websites. We are not responsible for the privacy practices or content of those websites.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">9. Changes to This Policy</h3>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-slate-900">10. Contact Us</h3>
          <p>If you have any questions regarding this Privacy Policy, you may contact us:</p>
          <p className="text-slate-700">
            Parwah Academy
            <br />
            Mahak Complex
            <br />
            Delhi Road, Rampur Maniharan
            <br />
            Saharanpur - 247451
            <br />
            Uttar Pradesh, India
          </p>
        </section>
      </div>
    </main>
  )
}

