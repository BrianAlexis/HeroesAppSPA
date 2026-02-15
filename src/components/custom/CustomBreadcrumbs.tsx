import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Link } from "react-router";

interface Breadcrum {
    label: string;
    to: string;
}


interface Props {
    currentPage: string;
    breadcrumbs?: Breadcrum[]
}

const CustomBreadcrumbs = ({ currentPage, breadcrumbs = [] }: Props) => {
    return (
        <Breadcrumb className="my-5">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to={"/"}>Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map(crumb => (
                    <div className="flex items-center">
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={crumb.to}>{crumb.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </div>
                ))}

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage className="text-black font-bold">{currentPage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default CustomBreadcrumbs