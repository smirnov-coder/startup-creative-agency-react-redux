import * as React from "react";
import { Message } from "@store/entities";
import { getDateTimeString } from "@scripts/utils";
import "./MessageItem.scss";

interface MessageItemProps {
    item: Message;
}

const MessageItem: React.SFC<MessageItemProps> = ({ item }: MessageItemProps) => {
    let { Name, Company, Email, IPAddress, CreatedOn, Subject, Text } = item;
    return (
        <div className="message">
            <div className="message__line"><b>Name:</b> {Name}</div>
            <div className="message__line"><b>Company:</b> {Company}</div>
            <div className="message__line"><b>E-mail:</b> {Email}</div>
            <div className="message__line"><b>IP Address:</b> {IPAddress}</div>
            <div className="message__line"><b>Send Date:</b> {getDateTimeString(CreatedOn)}</div>
            <div className="message__line"><b>Subject:</b> {Subject}</div>
            <div className="message__line"><b>Text:</b> {Text}</div>
        </div>
    );
}

export default MessageItem;