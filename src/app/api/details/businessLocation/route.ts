import { app, db } from "@/app/server"
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('location')
//     const documentRef = doc(db, 'businessLocation', `${id}`)
//     const businessLocationQuery = await getDoc(documentRef)
//     const documentData = businessLocationQuery.data();
//     const locationId = businessLocationQuery.id
//     console.log(locationId)
//     // return Response.json(documentData)
//     return Response.json({...documentData, locationid: locationId})
// }