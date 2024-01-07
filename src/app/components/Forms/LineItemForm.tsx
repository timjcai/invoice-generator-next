import React, { FC, useState } from "react";
import { LineItemType } from "../ReactGrid";
import { displayCurrency } from "@/app/utils";

export const LineItemForm: FC = () => {
    const [counter, setCounter] = useState<number>(0);
    const [currentLine, setCurrentLine] = useState<Partial<LineItemType>>({
        quantity: 1,
    });
    const [allItems, setAllItems] = useState<LineItemType[]>([]);
    // load function - to determine how many lineitems there are

    // push currentLine into all Items

    // remove INDEX line from lineItems

    // remove last line from lineItems

    // submit allLineItems - save into Cloud

    // create new line

    return (
        <div className="w-full">
            <form className="flex flex-col">
                <table>
                    <thead>
                        <tr className="grid grid-cols-6 border-2 border-black rounded-md bg-black text-white">
                            <th className="col-span-3">
                                <label htmlFor="lineDescription">
                                    Description
                                </label>
                            </th>
                            <th>
                                <label htmlFor="lineQuantity">Quantity</label>
                            </th>
                            <th>
                                <label htmlFor="lineRate">Rate</label>
                            </th>
                            <th>
                                <label htmlFor="lineAmount">Amount</label>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allItems.map((row: LineItemType) => {
                            return (
                                <tr className="grid grid-cols-6">
                                    <td className="col-span-3 ps-2">
                                        <p>{row.description}</p>
                                    </td>
                                    <td className="ps-2">
                                        <p>{row.quantity}</p>
                                    </td>
                                    <td className="ps-2">
                                        <p>
                                            {displayCurrency(row.rate, "AUD")}
                                        </p>
                                    </td>
                                    <td className="ps-2">
                                        <p>
                                            {displayCurrency(
                                                row.quantity * row.rate,
                                                "AUD"
                                            )}
                                        </p>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr className="grid grid-cols-6 border-2 border-black">
                            <td className="col-span-3 ">
                                <input
                                    className=" w-full border-1 border-[#EDEEEF] rounded-md"
                                    type="text"
                                    id="lineDescription"
                                    value={currentLine?.description}
                                    onChange={(e) =>
                                        setCurrentLine((prevState) => ({
                                            ...prevState,
                                            description: e.target.value,
                                        }))
                                    }
                                />
                            </td>
                            <td className="">
                                <input
                                    className=" w-full border-1 border-[#EDEEEF] rounded-md"
                                    type="number"
                                    id="lineQuantity"
                                    value={currentLine?.quantity}
                                    min={0}
                                    onChange={(e) =>
                                        setCurrentLine((prevState) => ({
                                            ...prevState,
                                            quantity: Number(e.target.value),
                                        }))
                                    }
                                />
                            </td>
                            <td className="">
                                <span className="relative">
                                    <div className="w-[45px] top-[0px] text-center text-sm absolute">
                                        $
                                    </div>
                                    <input
                                        className="ps-[32px] w-full border-1 border-[#EDEEEF] rounded-md"
                                        type="number"
                                        step="0.01"
                                        id="lineRate"
                                        min={0}
                                        value={currentLine?.rate}
                                        onChange={(e) =>
                                            setCurrentLine((prevState) => ({
                                                ...prevState,
                                                rate: Number(e.target.value),
                                            }))
                                        }
                                    />
                                </span>
                            </td>
                            <td className="">
                                <span className="relative">
                                    <div className="w-[45px] top-[0px] text-center text-sm absolute">
                                        $
                                    </div>
                                    <input
                                        className="ps-[32px] w-full border-1 border-[#EDEEEF] rounded-md"
                                        type="number"
                                        step="0.01"
                                        id="lineAmount"
                                        value={
                                            currentLine?.quantity! *
                                            currentLine?.rate!
                                                ? currentLine?.quantity! *
                                                  currentLine?.rate!
                                                : 0
                                        }
                                        disabled
                                    />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};
