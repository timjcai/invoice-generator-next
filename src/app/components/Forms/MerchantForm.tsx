"use client";
import {
    MerchantContextValue,
    ProfileContextValue,
    useMerchantContext,
    useProfileContext,
} from "@/app/context";
import { LocationType, BuyerType, StateType } from "@/app/types";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
    MerchantSelector,
    SelectorOptions,
    StateSelector,
} from "../common/Selector";
import { SkeletonBar } from "../UI";

export const MerchantForm: FC = () => {
    const {
        merchantId,
        setMerchantId,
        merchantDetails,
        setMerchantDetails,
        merchantLocation,
        setMerchantLocation,
        allMerchants,
        setAllMerchants,
        getMerchantIndex,
        selectorOptions,
        getMerchantDetails,
        loading,
        setLoading,
        updateMerchantDetails,
        createMerchant,
    } = useMerchantContext() as MerchantContextValue;
    const { uid } = useProfileContext() as ProfileContextValue;

    useEffect(() => {
        if (uid !== null && uid !== undefined) {
            getMerchantIndex(uid as string);
        }
        getMerchantDetails(merchantId);
        // function createSelectorOptions() {
        //     let billerArray = [] as SelectorOptions[];
        //     console.log(allBillers!);
        //     allBillers!.forEach((merchant) => {
        //         billerArray.push({
        //             value: merchant.id!,
        //             label: merchant.businessName,
        //         });
        //     });
        //     setBillerSelectorOptions(billerArray);
        //     console.log(billerArray);
        //     setLoading(false);
        //     console.log("successfully setup selector");
        // }
        // return () => createSelectorOptions();
    }, [uid, merchantId]);

    let selector;
    if (loading && allMerchants.length === 0) {
        selector = (
            <div className="mb-4">
                <SkeletonBar />
            </div>
        );
    } else {
        selector = (
            <div className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md">
                <MerchantSelector
                    initOptions={selectorOptions}
                    setState={setMerchantId}
                    defaultValue={merchantDetails.businessName!}
                />
            </div>
        );
    }

    async function merchantSaveButtonAction(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault();
        // to do: push local state changes to firebase
        console.log(merchantId);
        if (merchantId === null && uid !== null) {
            createMerchant(merchantDetails, uid as string);
            console.log("no merchant id - creating a new Merchant account");
        } else {
            updateMerchantDetails();
            console.log(merchantDetails);
            console.log(
                "updating local state - push local state changes to Firebase"
            );
            await getMerchantIndex(uid as string);
        }

        setLoading(false);
    }

    function handleABNInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setMerchantDetails((prevState: Partial<BuyerType>) => ({
                ...prevState,
                ABN: inputValue as string,
            }));
            // } else {
            //     console.log("invalid input message");
            // }
        }
    }

    function handlePostcodeInput(event: ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value ?? "";
        // console.log(merchantDetails.ABN);
        if (/^\d*$/.test(inputValue)) {
            setMerchantLocation((prevState: Partial<LocationType>) => ({
                ...prevState,
                postcode: inputValue,
            }));
        }
    }

    return (
        <div className="w-full">
            {selector}
            <form className="flex flex-col">
                <label
                    htmlFor="businessName"
                    className="text-md font-medium mb-2"
                >
                    Registered Business Name
                </label>
                {!loading ? (
                    <input
                        id="businessName"
                        type="text"
                        placeholder="Enter your Business Name"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={merchantDetails?.businessName}
                        onChange={(event) =>
                            setMerchantDetails(
                                (prevState: Partial<BuyerType>) => ({
                                    ...prevState,
                                    businessName: event.target.value,
                                })
                            )
                        }
                    ></input>
                ) : (
                    <div className="col-span-5 mb-4">
                        <SkeletonBar />
                    </div>
                )}

                <label htmlFor="ABN" className="text-md font-medium mb-2">
                    ABN
                </label>
                {!loading ? (
                    <input
                        id="ABN"
                        type="text"
                        pattern="[0-9]*"
                        maxLength={11}
                        minLength={11}
                        placeholder="Enter ABN"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={merchantDetails?.ABN ?? ""}
                        onChange={(event) => handleABNInput(event)}
                    ></input>
                ) : (
                    <div className="col-span-5 mb-4">
                        <SkeletonBar />
                    </div>
                )}
                <label htmlFor="ABN" className="text-md font-medium mb-2">
                    Slug
                </label>
                {!loading ? (
                    <input
                        id="Slug"
                        type="text"
                        maxLength={4}
                        minLength={3}
                        placeholder="Create Slug"
                        className="border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={merchantDetails?.slug ?? ""}
                        onChange={(event) =>
                            setMerchantDetails(
                                (prevState: Partial<BuyerType>) => ({
                                    ...prevState,
                                    slug: event.target.value,
                                })
                            )
                        }
                    ></input>
                ) : (
                    <div className="col-span-5 mb-4">
                        <SkeletonBar />
                    </div>
                )}

                <p className="text-md font-medium mb-2">Business Location</p>
                <div className="grid grid-cols-6">
                    <label
                        htmlFor="streetLine1"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 1
                    </label>
                    {!loading ? (
                        <input
                            id="streetLine1"
                            type="text"
                            placeholder="Enter your Street line 1"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={merchantLocation?.streetLine1}
                            onChange={(e) =>
                                setMerchantLocation(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        streetLine1: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}

                    <label
                        htmlFor="streetLine2"
                        className="text-md font-medium mb-2"
                    >
                        Street Line 2
                    </label>
                    {!loading ? (
                        <input
                            id="streetLine2"
                            type="text"
                            placeholder="Enter your Street line 2"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={merchantLocation?.streetLine2}
                            onChange={(e) =>
                                setMerchantLocation(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        streetLine2: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                    <label
                        htmlFor="suburb"
                        className="text-md font-medium mb-2"
                    >
                        Suburb
                    </label>
                    {!loading ? (
                        <input
                            id="suburb"
                            type="text"
                            placeholder="Enter your Suburb"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={merchantLocation?.suburb}
                            onChange={(e) =>
                                setMerchantLocation(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        suburb: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}

                    <label
                        htmlFor="country"
                        className="text-md font-medium mb-2"
                    >
                        Country
                    </label>
                    {!loading ? (
                        <input
                            id="country"
                            type="text"
                            placeholder="Enter your Country"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={merchantLocation?.country}
                            onChange={(e) =>
                                setMerchantLocation(
                                    (prevState: Partial<LocationType>) => ({
                                        ...prevState,
                                        country: e.target.value,
                                    })
                                )
                            }
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}

                    <label htmlFor="state" className="text-md font-medium mb-2">
                        State
                    </label>
                    {/* <input
                        id="state"
                        type="text"
                        placeholder="Enter your State"
                        className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                        required={true}
                        value={merchantLocation?.state}
                        onChange={(e) =>
                            setMerchantLocation(
                                (prevState: Partial<LocationType>) => ({
                                    ...prevState,
                                    state: e.target.value as StateType,
                                })
                            )
                        }
                    ></input> */}
                    {!loading ? (
                        <div className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md">
                            <StateSelector
                                setState={setMerchantLocation}
                                initValue={
                                    merchantLocation.state
                                        ? {
                                              value: merchantLocation.state,
                                              label: merchantLocation.state,
                                          }
                                        : undefined
                                }
                            />
                        </div>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}

                    <label
                        htmlFor="postcode"
                        className="text-md font-medium mb-2"
                    >
                        Postcode
                    </label>
                    {!loading ? (
                        <input
                            id="postcode"
                            type="text"
                            pattern="[0-9]*"
                            maxLength={4}
                            minLength={4}
                            placeholder="Enter your Postcode"
                            className="col-span-5 border-2 border-[#EDEEEF] p-3 mb-4 rounded-md"
                            required={true}
                            value={merchantLocation?.postcode ?? ""}
                            onChange={(event) => handlePostcodeInput(event)}
                        ></input>
                    ) : (
                        <div className="col-span-5 mb-4">
                            <SkeletonBar />
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full border-2 bg-[#212122] border-[#212122] py-2 text-white font-light rounded-md mt-4 mb-4 disabled:opacity-40"
                    onClick={(e) => merchantSaveButtonAction(e)}
                    // disabled={!userEmail || !userPassword}
                >
                    {merchantId ? "Save" : "Create"}
                </button>
            </form>
        </div>
    );
};
