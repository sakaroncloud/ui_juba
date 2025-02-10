import React from "react";

export const AccountMainWrapper = ({
    children,
    title,
    subtitle,
}: {
    children: React.ReactNode;
    title: string;
    subtitle?: string | React.ReactNode;
}) => {
    const typeOfSubtitle = typeof subtitle;

    return (
        <div>
            <div className="mb-4">
                <h2 className="capitalize text__medium font-bold mb-1 !text-primary">
                    {title}
                </h2>
                {typeOfSubtitle == "string" && (
                    <p className="capitalize font-medium text-gray-600">{subtitle}</p>
                )}
            </div>
            {children}
        </div>
    );
};