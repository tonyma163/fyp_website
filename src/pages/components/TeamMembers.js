import Image from "next/image";

const teamMembers = [
    {
      name: 'Tony',
      position: 'Student',
      imageUrl: '/images/oldbro.jpg',
    },
    {
      name: 'William',
      position: 'Student',
      imageUrl: '/images/oldbro.jpg',
    },
    {
      name: 'Jeffrey',
      position: 'Student',
      imageUrl: '/images/oldbro.jpg',
    },
    {
      name: 'Thomas',
      position: 'Student',
      imageUrl: '/images/oldbro.jpg',
    },
    {
      name: 'PJ',
      position: 'Student',
      imageUrl: '/images/oldbro.jpg',
    },
  ];

const TeamMembers = () => {
    return(
        <>
            <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                <Image
                  src={member.imageUrl}
                  width={300}
                  height={300}
                  className="w-48 h-48 mx-auto mb-4 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-gray-500">{member.position}</p>
                </div>
                ))}
            </div>
            </div>
        </>
    )
}

export default TeamMembers;