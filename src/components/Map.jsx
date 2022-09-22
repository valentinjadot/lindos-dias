export default function Map(props) {
    let { coords } = props;
    let apiKey = import.meta.env.VITE_GMAPS_API_KEY;
    const url = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${coords.latitude},${coords.longitude}&zoom=10&maptype=satellite`

    return (
        <iframe
            title="map"
            width="450"
            height="250"
            frameBorder="0"
            referrerPolicy="no-referrer-when-downgrade"
            src={url}
            allowFullScreen >
        </iframe >
    )
}
