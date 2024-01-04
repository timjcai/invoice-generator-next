"use client";
import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

export const SkeletonEllipsis: FC = () => {
    return (
        <>
            <LoadingSpan></LoadingSpan>
            <LoadingSpan></LoadingSpan>
            <LoadingSpan></LoadingSpan>
        </>
    );
};

const dotAnimation = keyframes`
    50%{
        opacity: 0;
        transform: scale(0.7) translateY(10px)
    }
`;

const LoadingSpan = styled.span`
    width: 8px;
    height: 8px;
    margin: 0 5px;
    background-color: #3d3b40;
    border-radius: 50%;
    display: inline-block;
    animation-name: ${dotAnimation};
    animation-duration: 2s;
    antimation-iteration-count: infinite;
    animation-timing-function: ease-in-out;

    &:nth-child(2) {
        background-color: #3d3b40;
        animation-delay: 0.4s;
    }

    &:nth-child(3) {
        background-color: #3d3b40;
        animation-delay: 0.8s;
    }
`;
