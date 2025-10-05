import { api } from "@/lib/api"

export async function queryBuildKG(query : string) {
    try {
        const body = { "query": query }
        console.log(body)
        const res = await api.post("api/actions/buildKGFromQuery", body)
        console.log(res)
        return res.data
    } catch (error) {
        console.error("Error:", error);
        // return error
    }
}