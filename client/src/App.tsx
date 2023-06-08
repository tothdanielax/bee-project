import {memo} from "react";
import {faker} from "@faker-js/faker";
import OwnCard from "@components/ui/HoneyCard.tsx";

function App() {
    return (
        <div className='grid grid-cols-6 gap-10 mx-auto h-max'>
            <OwnCard
                className='col-span-3'
                imgUrl='https://media.istockphoto.com/id/528812681/hu/fot%C3%B3/feh%C3%A9r-ak%C3%A1c-vir%C3%A1gai-a-z%C3%B6ld-lombozat-ellen.jpg?s=612x612&w=0&k=20&c=IXzKdHrr-96mA4boWJe-BS0tb0sI747vmvwUwoWTsuE='
                alt='akác' title='Akác' description={faker.lorem.lines(5)}/>
            <OwnCard
                className='col-span-3'
                imgUrl='https://cdn.pixabay.com/photo/2016/02/27/06/43/cherry-blossom-tree-1225186_1280.jpg'
                alt='gyógy' title='Gyógy' description={faker.lorem.lines(5)}/>
            <OwnCard
                className='col-span-3'
                imgUrl='https://media.istockphoto.com/id/1463692104/hu/fot%C3%B3/tilia-cordata-ny%C3%A1ron-vir%C3%A1gz%C3%B3-kis-h%C3%A1rsfa.jpg?s=612x612&w=0&k=20&c=lj8aDPHiiBWUrWKv-2b74QYVU3z6QW1I9-5OvdcHhnw='
                alt='hárs' title='Hárs' description={faker.lorem.lines(5)}/>
            <OwnCard
                className='col-span-3'
                imgUrl='https://cdn.pixabay.com/photo/2013/10/06/17/13/bee-191629_1280.jpg'
                alt='virág' title='Virág' description={faker.lorem.lines(5)}/>
            <OwnCard
                className='col-span-6 w-1/2'
                imgUrl='https://cdn.pixabay.com/photo/2020/04/27/06/37/oilseed-rape-5098369_1280.jpg'
                alt='repce' title='Repce' description={faker.lorem.lines(5)}/>
        </div>
    );
}

export default memo(App);
