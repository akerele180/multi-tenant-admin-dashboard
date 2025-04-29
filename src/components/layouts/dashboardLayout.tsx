import { Outlet } from "react-router";
import { AppSidebar } from "../app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
// import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../ui/breadcrumb";
import { useAuth } from "../../hooks/useAuth";
import { Tenant, User } from "../../utils/models";
import { useTenantTheme } from "../../hooks/useTenantTheme";


export default function DashboardLayout() {
    const { state } = useAuth();
    useTenantTheme();

    return (
        <SidebarProvider>
            <AppSidebar tenant={state.tenant as Tenant} user={state.user as User} />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <div className="">
                            SASS ADMIN DASHBOARD
                        </div>
                        {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}
                    </div>
                </header>
                <section className="px-4">
                    <Outlet />
                </section>
            </SidebarInset>
        </SidebarProvider>
    )
}
