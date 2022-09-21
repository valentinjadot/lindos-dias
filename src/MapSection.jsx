import { Space } from '@mantine/core';
import Map from './Map';

export default function MapSection({ coords }) {
    return (
        <>
            <Space h="lg" />
            <Map coords={coords} />
            <Space h="lg" />
        </>
    )

}
