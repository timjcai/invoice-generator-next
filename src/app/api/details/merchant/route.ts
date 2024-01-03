import { app, db } from "@/app/server"
import { BuyerType } from "@/app/types"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('user')
    const q = query(collection(db, 'merchant'), where('associatedUser','==', `${id}`))
    const userQuery = await getDocs(q)
    let payload = [] as BuyerType[];
    userQuery.docs.forEach((item)=> {
        payload.push({...item.data(), id: item.id} as BuyerType);
    })
    // const documentData = userQuery.docs[0].data();
    // console.log(documentData)
    return Response.json(payload)
}