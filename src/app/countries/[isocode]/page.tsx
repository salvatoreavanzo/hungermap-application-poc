import {notFound} from "next/navigation";

export default function CountryDetails( {params} : {
    params: { isocode: string }
} ) {
    if (params.isocode == "TTT") {
        notFound()
    }
    return (
        <div>
            <h1>Country Details {params.isocode}</h1>
        </div>
    );
}