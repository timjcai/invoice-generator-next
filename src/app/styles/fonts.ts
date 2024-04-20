import { Inter } from "next/font/google";
import localFont from 'next/font/local'


export const satoshi = localFont({
    src:[
        {
            path: 'public/fonts/Satoshi-Regular.woff2',
            weight: '400'
        },{
            path: 'public/fonts/Satoshi-Medium.woff2',
            weight: '500'
        },
        {
            path: 'public/fonts/Satoshi-Bold.woff2',
            weight: '700'
        },
        {
            path: 'public/fonts/Satoshi-Light.woff2',
            weight: '300'
        },
    ],
}); 