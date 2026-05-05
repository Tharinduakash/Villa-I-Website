import PolicyPage, { PolicySection } from '@/components/PolicyPage'

export const metadata = { title: 'Terms & Conditions – Villa i Hotel' }

export default function TermsConditions() {
  return (
    <PolicyPage title="Terms & Conditions" lastUpdated="January 2025">
      <PolicySection title="Reservations" index={0}>
        <p>All bookings are subject to availability. A reservation is confirmed only upon receipt of a written confirmation from Villa i Hotel. Rates are quoted in USD and are per room per night unless stated otherwise.</p>
      </PolicySection>

      <PolicySection title="Check-In & Check-Out" index={1}>
        <ul>
          <li>Check-in: 2:00 PM &nbsp;|&nbsp; Check-out: 11:00 AM</li>
          <li>Early check-in and late check-out are subject to availability and may incur additional charges</li>
          <li>A valid government-issued photo ID is required at check-in</li>
        </ul>
      </PolicySection>

      <PolicySection title="Payment" index={2}>
        <p>Full payment or a deposit may be required to secure your reservation depending on the booking platform or season. Accepted payment methods: cash, bank transfer, and major credit cards.</p>
      </PolicySection>

      <PolicySection title="Guest Responsibilities" index={3}>
        <p>Guests are responsible for any damage caused to the property during their stay. Villa i Hotel reserves the right to charge the guest's account for any such damage. Smoking is not permitted inside the rooms.</p>
      </PolicySection>

      <PolicySection title="Liability" index={4}>
        <p>Villa i Hotel is not liable for loss of personal property, illness, injury, or any circumstance beyond our reasonable control. Guests are encouraged to arrange their own travel insurance.</p>
      </PolicySection>

      <PolicySection title="Governing Law" index={5}>
        <p>These terms are governed by the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.</p>
      </PolicySection>

      <PolicySection title="Contact" index={6}>
        <p>
          Villa i Hotel · Mount Lavinia, Colombo, Sri Lanka<br />
          Phone: <a href="tel:+94777863412" className="policy-link">+94 77 786 3412</a> / <a href="tel:+94112727147" className="policy-link">+94 11 272 7147</a><br />
          Email: <a href="mailto:infovillaimountlavinia@gmail.com" className="policy-link">infovillaimountlavinia@gmail.com</a>
        </p>
      </PolicySection>
    </PolicyPage>
  )
}
