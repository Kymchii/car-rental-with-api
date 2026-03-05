import { ButtonWhite } from "../ButtonWhite"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const CarBrand = ({ carBrands, setSelectedBrand, selectedBrand, loading }) => {
    return (
        <div id='car-brand-section' className="grid grid-cols-2 p-4 gap-4 justify-items-stretch sm:grid-cols-4 sm:p-8 md:grid-cols-5  lg:grid-cols-6">
            {loading ? (
                Array(6).fill(0).map((item, i) => (
                    <div key={i} className="relative h-24 bg-linear-to-b from-blue-500 via-blue-300 to-blue-100 shadow-sm p-6 rounded-md group flex justify-center items-center flex-col gap-2">
                        <Skeleton circle width={35} height={35} />
                        <Skeleton width={75} height={15} />
                    </div>
                ))
            ) : (
                carBrands.map((item) => (
                    <div key={item.id} className="relative h-24 bg-linear-to-b from-blue-500 via-blue-300 to-blue-100 shadow-sm p-6 rounded-md group">
                        <img src={`http://localhost:8000/storage/${item.logo}`} alt={item.name} className="w-full h-full object-contain object-center" />
                        <div className="absolute flex justify-center items-center inset-0 bg-slate-950/35 rounded-md opacity-0 group-hover:opacity-100 group-active:opacity-100 delay-75 transition-all">
                            <ButtonWhite onClick={() => setSelectedBrand(selectedBrand === item.id ? null : item.id)} >See car</ButtonWhite>
                        </div>
                    </div>
                ))
            )}
        </div >
    )
}
