"use client";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { displayCurrency } from "@/app/utils";
import { LineItemsType } from "@/app/types";
import { LineItemsContextValue, useLineItemsContext } from "@/app/context";
import { Icon } from "../UI";

export const LineItemForm: FC = () => {
    const { currentLine, setCurrentLine, allItems, setAllItems } =
        useLineItemsContext() as LineItemsContextValue;
    // load function - to determine how many lineitems there are

    // push currentLine into all Items
    function submitAndSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (allItems.length < 10) {
            setAllItems((prevState) => [...prevState, currentLine]);
            clearCurrentLine();
        } else {
            // add alert - we there is a maximum of 10 lines per invoice, consider creating a second invoice or consolidating some of your line items
        }
    }

    useEffect(() => {}, [currentLine, allItems]);

    function handleQuantityInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setCurrentLine((prevState) => ({
                ...prevState,
                quantity: Number(event.target.value),
            }));
        }
    }

    function handleRateInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setCurrentLine((prevState) => ({
                ...prevState,
                rate: Number(event.target.value),
            }));
        }
    }

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
                                    type="text"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    minLength={0}
                                    id="lineQuantity"
                                    value={currentLine.quantity}
                                    min={0}
                                    onChange={(e) => handleQuantityInput(e)}
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
                                        type="text"
                                        pattern="[0-9]*"
                                        maxLength={5}
                                        minLength={1}
                                        min={0}
                                        id="lineRate"
                                        value={currentLine.rate}
                                        onChange={(e) => handleRateInput(e)}
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
    const [isHovered, setIsHovered] = useState<boolean>(false);

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
                className="absolute -right-1 top-3 py-1 px-0"
                onClick={(e) => handleDeleteButton(e)}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ background: isHovered ? "lightblue" : "transparent" }}
            >
                <Icon label="delete" />
            </button>
        </tr>
    );
};
