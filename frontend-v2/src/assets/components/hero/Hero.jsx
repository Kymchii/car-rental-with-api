import { Autoplay, EffectFade, Keyboard, Navigation, Pagination, Scrollbar } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { ButtonBlue600 } from "../ButtonBlue600"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

export const Hero = ({ swiper }) => {
    return (
        <div id='hero-section' className='mt-16 w-lvw h-full'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, Autoplay, EffectFade, Keyboard]}
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                effect='fade'
                keyboard={{ enabled: true }}
            >
                {swiper.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group">
                            <div className={`absolute bg-slate-950/35 w-full h-full lg:p-16 p-4 sm:p-8 flex flex-col justify-end ${item.align} gap-2`}>
                                <h1 className={`md:text-2xl sm:text-xl font-bold text-white ${item.textAlign}`}>{item.message}</h1>
                                <ButtonBlue600>Call to action</ButtonBlue600>
                            </div>
                            <img className="object-cover lg:h-lvh w-full" src={item.img} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
