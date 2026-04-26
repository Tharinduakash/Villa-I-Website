export default function ContactMap() {
  return (
    <section className="h-[420px] relative border-t border-white/5">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9963743041087!2d79.86394847469938!3d6.836748793152745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b00ea75ab55%3A0x7b22fc5e3e6e1e33!2sMount%20Lavinia%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1714000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(0.85)' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Villa i Hotel — Mount Lavinia, Sri Lanka"
      />
      <div className="absolute top-6 left-6 bg-luxury-black/90 backdrop-blur-sm border border-luxury-gold/30 px-5 py-3">
        <p className="text-luxury-gold font-playfair text-sm italic">Villa i Hotel</p>
        <p className="text-white/50 font-lato text-xs mt-0.5">Mount Lavinia, Sri Lanka</p>
      </div>
    </section>
  )
}
