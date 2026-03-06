import Skeleton from "react-loading-skeleton"
import { API_BASE_URL, IMAGEKIT_URL } from "../../../config/api"
import { ButtonWhite } from "../ButtonWhite"
import 'react-loading-skeleton/dist/skeleton.css'

export const CarModel = ({ carModels, onOpenQuickRent, loading }) => {
    return (
        <div id='car-model-section' className="grid grid-cols-2 gap-4 justify-items-stretch px-4 pb-4 sm:pb-8 sm:px-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {loading ? (
                Array(14).fill(0).map((item, i) =>
                    <div key={i} className="flex flex-col gap-2 bg-linear-to-t from-blue-500 via-blue-300 to-blue-100 p-4 rounded-md shadow-sm">
                        <Skeleton width={'full'} height={100} />
                        <div className="flex flex-col justify-end h-full gap-2">
                            <div>
                                <Skeleton width={75} height={12} />
                                <Skeleton width={100} height={10} />
                            </div>
                            <ButtonWhite onClick={() => onOpenQuickRent(item)}><Skeleton width={50} height={12} /></ButtonWhite>
                        </div>
                    </div>
                )
            ) : (
                carModels.map((item) => (
                    <div key={item.id} className="flex flex-col gap-2 bg-linear-to-t from-blue-500 via-blue-300 to-blue-100 p-4 rounded-md shadow-sm">
                        <img src={`${IMAGEKIT_URL}/${item.logo}`} alt={item.name} />
                        <div className="flex flex-col justify-end h-full gap-2">
                            <div>
                                <h1 className="text-sm text-white font-semibold">{item.name}</h1>
                                <h2 className="text-xs text-slate-950/50 font-light">Rp. {item.price.toLocaleString('id-ID')}</h2>
                            </div>
                            <ButtonWhite onClick={() => onOpenQuickRent(item)}>Choose</ButtonWhite>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
