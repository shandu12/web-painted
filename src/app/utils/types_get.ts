import useSwr from "swr";
import { server } from "@/utils/server";

export default function typesGet () : { data: any; error: any; } {
    let api=`${server}/products/types/`;
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    return useSwr(api, fetcher);
}
