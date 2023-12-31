import { app, db } from "@/app/server"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('user')
    const q = query(collection(db, 'profile'), where('user_id','==', `${id}`))
    const userQuery = await getDocs(q)
    const documentData = userQuery.docs[0].data();
    const profileId = userQuery.docs[0].id
    return Response.json({...documentData, profileid: profileId})
}