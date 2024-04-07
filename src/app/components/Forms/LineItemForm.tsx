"use client";
import React, { FC, useEffect, useState } from "react";
import { displayCurrency } from "@/app/utils";
import { LineItemsType } from "@/app/types";
import { LineItemsContextValue, useLineItemsContext } from "@/app/context";
import { Icon } from "../UI";

export const LineItemForm: FC = () => {
    // const [counter, setCounter] = useState<number>(0);
    // const [currentLine, setCurrentLine] = useState<Partial<LineItemsType>>({
    //     description: "",
    //     quantity: 1,
    //     rate: 0,
    // });
    // const [allItems, setAllItems] = useState<Partial<LineItemsType>[]>([]);

    const { currentLine, setCurrentLine, allItems, setAllItems } =
        useLineItemsContext() as LineItemsContextValue;
    // load function - to determine how many lineitems there are

    // push currentLine into all Items
    function submitAndSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAllItems((prevState) => [...prevState, currentLine]);
        clearCurrentLine();
    }

    useEffect(() => {}, [currentLine, allItems]);
    // remove INDEX line from lineItems

    // remove last line from lineItems

    // submit allLineItems - save into Cloud

    // handle number changes

    //

    function clearCurrentLine() {
        setCurrentLine({
            description: "",
            quantity: 1,
            rate: 0,
        });
    }

    // create new line

    return (
        <div className="w-full">
            <form className="flex flex-col" onSubmit={(e) => submitAndSave(e)}>
                <h2 className="text-2xl font-bold">Line Items</h2>
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
                        {allItems.map((row: Partial<LineItemsType>, index) => {
                            return (
                                <LineItemDisplayComponent
                                    index={index}
                                    description={row.description!}
                                    quantity={row.quantity!}
                                    rate={row.rate!}
                                />
                            );
                        })}
                        <tr className="grid grid-cols-6 border-2 border-black">
                            <td className="col-span-3 ">
                                <input
                                    className=" w-full border-1 border-[#EDEEEF] rounded-md"
                                    type="text"
                                    id="lineDescription"
                                    value={currentLine.description}
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
                                    autoComplete="off"
                                    className=" w-full border-1 border-[#EDEEEF] rounded-md"
                                    type="number"
                                    id="lineQuantity"
                                    value={currentLine.quantity}
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
                                        autoComplete="off"
                                        className="ps-[32px] w-full border-1 border-[#EDEEEF] rounded-md"
                                        type="number"
                                        id="lineRate"
                                        value={currentLine.rate}
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
                                            (currentLine.quantity! as number) *
                                            (currentLine.rate! as number)
                                                ? (currentLine?.quantity! as number) *
                                                  (currentLine?.rate! as number)
                                                : 0
                                        }
                                        disabled
                                    />
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    type="submit"
                    className="border-2 bg-[#212122] border-[#212122] py-1 text-white font-light rounded-md px-6 justify-center items-center mx-3 flex h-[40px] my-2"
                >
                    Add Line
                </button>
            </form>
        </div>
    );
};

export const LineItemDisplayComponent: FC<LineItemsType> = ({
    description,
    quantity,
    rate,
    index,
}) => {
    const { deleteLineItem } = useLineItemsContext() as LineItemsContextValue;

    function handleDeleteButton(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        console.log("hello");
        console.log(index);
        if (index) {
            deleteLineItem(index);
        }
    }

    return (
        <tr className="grid grid-cols-6 relative" key={index}>
            <td className="col-span-3 p-3">
                <p>{description}</p>
            </td>
            <td className="p-3">
                <p>{quantity}</p>
            </td>
            <td className="p-3">
                <p>{displayCurrency(rate!, "AUD")}</p>
            </td>
            <td className="p-3">
                <p>{displayCurrency(quantity! * rate!, "AUD")}</p>
            </td>
            <button
                className="absolute -right-1 top-4"
                onClick={(e) => handleDeleteButton(e)}
            >
                <Icon label="delete" />
            </button>
        </tr>
    );
};
