"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

export const SkeletonBar = () => {
    return <Skeleton></Skeleton>;
};

const skeletonLoading = keyframes`
    0% {
        background-color: hsl(200,20%,70%)
    }
    100% {
        background-color: hsl(200, 20%, 95%)
    }
`;

const Skeleton = styled.div`
    width: 100%;
    height: 48px;
    opacity: 0.7;
    border-radius: 6px;
    animation-name: ${skeletonLoading};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
`;

// Tutorial: https://www.youtube.com/watch?v=ZVug65gW-fc
