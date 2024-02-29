import { CardImg, Subtitle, Title } from '@/common/atoms';
import { Card } from '@/common/molecules';
import { useStaff } from './useStaff';

const Staff = () => {
  const { staff } = useStaff();

  return (
    <div className='container mt-20 mx-auto pb-32'>
      <Title>Our Staff</Title>
      <div className='cards grid grid-cols-3 py-24 gap-7 justify-center gap-y-14 '>
        {staff.map(({ id, image, name, treatmentNames }) => (
          <Card title={name} key={id}>
            <>
              <CardImg src={image.platformLink} alt={image.fileName} />

              <div className='py-3'>
                <ul>
                  {treatmentNames.map((value, index) => (
                    <li className='text-sky-800 ' key={index}>
                      {value}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Staff;
