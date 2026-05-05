import PolicyPage, { PolicySection } from '@/components/PolicyPage'

export const metadata = { title: 'Privacy Policy – Villa i Hotel' }

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy" lastUpdated="January 2025">
      <PolicySection title="Information We Collect" index={0}>
        <p>We collect personal information you provide when making a booking or enquiry, including your name, email address, phone number, and payment details. We also collect standard web analytics data (pages visited, device type) to improve our website.</p>
      </PolicySection>

      <PolicySection title="How We Use Your Information" index={1}>
        <ul>
          <li>To process and confirm your reservation</li>
          <li>To send booking confirmations and pre-arrival information</li>
          <li>To respond to enquiries and provide customer support</li>
          <li>To send promotional offers, only if you have opted in</li>
          <li>To comply with legal obligations</li>
        </ul>
      </PolicySection>

      <PolicySection title="Data Sharing" index={2}>
        <p>We do not sell or rent your personal data to third parties. We may share information with trusted partners (payment processors, booking platforms such as Booking.com, Agoda, and Airbnb) solely to fulfil your reservation.</p>
      </PolicySection>

      <PolicySection title="Data Security" index={3}>
        <p>Your data is stored securely and access is restricted to authorised staff only. Payment transactions are processed through encrypted, PCI-compliant gateways.</p>
      </PolicySection>

      <PolicySection title="Your Rights" index={4}>
        <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:infovillaimountlavinia@gmail.com" className="policy-link">infovillaimountlavinia@gmail.com</a>.</p>
      </PolicySection>

      <PolicySection title="Contact" index={5}>
        <p>
          Villa i Hotel · Mount Lavinia, Colombo, Sri Lanka<br />
          Phone: <a href="tel:+94777863412" className="policy-link">+94 77 786 3412</a> / <a href="tel:+94112727147" className="policy-link">+94 11 272 7147</a><br />
          Email: <a href="mailto:infovillaimountlavinia@gmail.com" className="policy-link">infovillaimountlavinia@gmail.com</a>
        </p>
      </PolicySection>
    </PolicyPage>
  )
}
