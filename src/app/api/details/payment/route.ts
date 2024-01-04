import { app, db } from "@/app/server"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('payment')
    const documentRef = doc(db, 'paymentDetails', `${id}`)
    const paymentDetailQuery = await getDoc(documentRef)
    const documentData = paymentDetailQuery.data();
    return Response.json(documentData)
}