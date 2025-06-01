/***************************************************************
                 IMPORTS
***************************************************************/
import { FC } from 'react';
import Image from 'next/image';

/***************************************************************
                 Types
***************************************************************/
interface ProfileProps {
    name: string;
    subtitle: string;
    imageUrl: string;
}

/***************************************************************
                 Components
***************************************************************/
const Profile: FC<ProfileProps> = ({ name }) => {
    /***************************************************************
                   RENDER  
    ***************************************************************/
    return (
        <div className="flex flex-row max-w-lg w-full top-0 ">
            <div className="relative w-56 h-56 flex-shrink-0 -ml-6">
                <Image
                    src="/images/profile.png"
                    alt={name}
                    fill
                    className="rounded-full object-cover"
                />
            </div>
            <div className="-ml-6 flex flex-col justify-center">
                <h1 className="text-2xl font-bold text-white">Toby J</h1>
                <ol className="text-white/80 list-disc list-inside">
                    <li>Obsessed Websites</li>
                    <li>Easy Ai Tools</li>
                    <li>Easy Marketing</li>
                </ol>
            </div>
        </div>
    );
};

/***************************************************************
                 EXPORTS
***************************************************************/
export default Profile;

/***************************************************************
                 NOTES
***************************************************************/
/*
- Business card/email signature style
- Profile image top left, name/subtitle right
- Card background, rounded corners, shadow
- Responsive and modern
*/ 