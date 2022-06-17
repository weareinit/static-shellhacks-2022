// declare module "*.svg" {
//     const content: any;
//     export default content;
// }

declare module "*.svg" {
    const content: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
}

declare module "*.png" {
    const content: any;
    export default content;
}

declare module "*.webp" {
    const content: any;
    export default content;
}

declare module "*.module.css" {
    const content: any;
    export default content;
}

declare module "react-file-previewer";
