import React from 'react'
import Card from '../../common/Card'

const DashboardHero = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto'> 
                <h1 className='text-2xl font-normal mb-4'>Our Apps</h1>
                <div className='flex justify-between items-center gap-6'>
                    <Card text={'Finance Planner'} subheading={'it is an amazing Patform'} imageUrl={'https://radius-ois.ai/wp-content/uploads/2023/10/Artboard-1.jpg'} />
                    <Card text={'Personal Manager'} subheading={'it is an amazing Patform'} imageUrl={'https://radius-ois.ai/wp-content/uploads/2023/10/Artboard-1.jpg'} />
                    <Card text={'Vs Code Viewer'} subheading={'it is an amazing Patform'} imageUrl={'https://radius-ois.ai/wp-content/uploads/2023/10/Artboard-1.jpg'} />
                </div> 
            </div>
        </>
    )
}

export default DashboardHero