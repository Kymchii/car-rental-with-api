import { CarBrand } from "../assets/components/car-brand/CarBrand"
import { CarModel } from "../assets/components/car-model/CarModel"
import { Hero } from "../assets/components/hero/Hero"
import { swiper } from "../config/data"

export const Main = ({ carBrands, selectedBrand, setSelectedBrand, carModels, handleOpenQuickRent }) => {
    return (
        <>
            {/* HERO SECTION */}
            <Hero swiper={swiper} />
            {/* END HERO SECTION */}

            {/* CAR BRAND SECTION */}
            <CarBrand carBrands={carBrands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
            {/* END CAR BRAND SECTION */}

            {/* CAR MODEL SECTION */}
            <CarModel carModels={carModels} onOpenQuickRent={handleOpenQuickRent} />
            {/* END CAR MODEL SECTION */}
        </>
    )
}
