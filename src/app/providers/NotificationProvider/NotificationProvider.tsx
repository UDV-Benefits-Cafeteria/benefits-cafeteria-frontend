import React, { createContext, useContext, useState } from "react";
import { message } from "antd";

type NotificationContextType = {
    showMessage: (content: string, type: "success" | "error" | "loading" | "info" | "warning", key?: string) => void;
    destroyMessage: (key: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (content: string, type: "success" | "error" | "loading" | "info" | "warning", key?: string) => {
        messageApi.open({
            key,
            type,
            content,
            duration: type === "loading" ? 0 : 3,
        });
    };

    const destroyMessage = (key: string) => {
        messageApi.destroy(key);
    }

    return (
        <NotificationContext.Provider value={{ showMessage, destroyMessage }}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
