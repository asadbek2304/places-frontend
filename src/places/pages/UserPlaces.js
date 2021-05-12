import React from 'react';
import { useParams } from 'react-router-dom'

import PlaceList from '../component/PlaceList';

const Sluchayni = [
    {
        id: 'p1',
        title: 'Mega planet',
        description: 'Juda ajoyib gipermarket',
        imageUrl: 'https://www.gazeta.uz/media/img/2019/11/sOVX4N15737319350425_b.jpg',
        address: 'Tashkent, Uzbekistan',
        location: {
            lat: 32.4232,
            lng: -46.043
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Somsaxona',
        description: 'Somsachi nomi bilan tanilgan dokon',
        imageUrl: 'https://avatars.mds.yandex.net/get-altay/3629247/2a00000175ec4821522382c46848d895f7fc/XXXL',
        address: 'Buka, Tashkent, Uzbekistan',
        location: {
            lat: 32.4232,
            lng: -46.043
        },
        creator: 'u2'
    },
]

const UserPlaces = () => {
    const userId = useParams().uId;
    const loadedPlaces = Sluchayni.filter(place => place.creator === userId)

     return <PlaceList items={loadedPlaces}/>
};

export default UserPlaces;