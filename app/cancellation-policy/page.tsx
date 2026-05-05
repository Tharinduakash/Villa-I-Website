import PolicyPage, { PolicySection } from '@/components/PolicyPage'

export const metadata = { title: 'Cancellation Policy – Villa i Hotel' }

export default function CancellationPolicy() {
  return (
    <PolicyPage title="Cancellation Policy" lastUpdated="January 2025">
      <PolicySection title="Standard Cancellations" index={0}>
        <ul>
          <li><strong>More than 7 days before arrival:</strong> Full refund of any deposit paid</li>
          <li><strong>3 – 7 days before arrival:</strong> 50% of the total booking value will be charged</li>
          <li><strong>Less than 3 days before arrival:</strong> 100% of the total booking value will be charged (no refund)</li>
          <li><strong>No-show:</strong> Full booking amount is charged</li>
        </ul>
      </PolicySection>

      <PolicySection title="Non-Refundable Rates" index={1}>
        <p>Certain promotional or discounted rates are strictly non-refundable. This will be clearly indicated at the time of booking.</p>
      </PolicySection>

      <PolicySection title="Full Villa Bookings" index={2}>
        <p>Full villa exclusive bookings require a <strong>30% non-refundable deposit</strong> at the time of confirmation. The remaining balance is due 14 days prior to arrival. Cancellations within 14 days of arrival are non-refundable.</p>
      </PolicySection>

      <PolicySection title="How to Cancel" index={3}>
        <p>To cancel a reservation, please contact us directly as soon as possible:</p>
        <ul>
          <li>Email: <a href="mailto:infovillaimountlavinia@gmail.com" className="policy-link">infovillaimountlavinia@gmail.com</a></li>
          <li>Phone: <a href="tel:+94777863412" className="policy-link">+94 77 786 3412</a> / <a href="tel:+94112727147" className="policy-link">+94 11 272 7147</a></li>
        </ul>
        <p>Cancellations made through third-party booking platforms (Booking.com, Agoda, Airbnb) are subject to that platform's cancellation policy.</p>
      </PolicySection>

      <PolicySection title="Exceptional Circumstances" index={4}>
        <p>In cases of genuine emergency (documented medical emergency, natural disaster, or government travel restrictions), we will review cancellation requests on a case-by-case basis.</p>
      </PolicySection>
    </PolicyPage>
  )
}
