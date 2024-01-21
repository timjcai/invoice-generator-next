import { SelectorOptions } from "@/app/components/common"
import { app, db } from "@/app/server"
import { BuyerType } from "@/app/types"
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore"
import { useSearchParams } from "next/navigation"

// export async function GET(request: Request) {
//     const { searchParams } = new URL(request.url)
//     const id = searchParams.get('user')
//     const q = query(collection(db, 'merchant'), where('associatedUser','==', `${id}`))
//     const userQuery = await getDocs(q)

//     // allMerchants
//     let allMerchants = [] as BuyerType[];
//     userQuery.docs.forEach((item)=> {
//         allMerchants.push({...item.data(), id: item.id} as BuyerType);
//     })

//     // allMerchants as options for Selector
//     let options = [] as SelectorOptions[];
//     allMerchants.forEach((merchant)=>{
//         options.push({
//             value: merchant.id!,
//             label: merchant.businessName,
//         })
//     })

//     return Response.json({allMerchants: allMerchants, selectorOptions: options})
// }
