import * as React from "react";

interface NamedComponent {
    displayName?: string;
    name?: string;
}

export default function (children: React.ReactNode, component: NamedComponent): React.ReactNodeArray {
    const result: React.ReactNodeArray = [];
    /* This is the array of result since Article can have multiple times the same sub-component */
    const type = [component.displayName] || [component.name];
    /* We can store the actual name of the component through the displayName or name property of our sub-component */
    React.Children.forEach(children, (child: { type?: NamedComponent }) => {
        const childType = child && child.type && (child.type.displayName || child.type.name);
        if (type.indexOf(childType) !== -1) {
            result.push(child);
        }
    });
    /* Then we go through each React children, if one of matches the name of the sub-component we’re looking for 
     * we put it in the result array */
    return result;
};