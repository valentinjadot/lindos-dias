import { Loader, Space, Text } from '@mantine/core';

export default function LoaderSection({ isLoading }) {

    return (
        <>
            <Space h="lg" />
            {isLoading && <Loader />}
            <Space h="lg" />
        </>
    )

}
