export default function Map(props) {
    let { coords } = props;
    const url = `https://www.google.com/maps/embed/v1/view?key=AIzaSyB_OlcPqnIH0wnl8gfCka6PjhN4s-c7nZU&center=${coords.latitude},${coords.longitude}&zoom=10&maptype=satellite`

    return (
        <iframe
            width="450"
            height="250"
            frameBorder="0"
            referrerPolicy="no-referrer-when-downgrade"
            src={url}
            allowFullScreen >
        </iframe >
    )
}
