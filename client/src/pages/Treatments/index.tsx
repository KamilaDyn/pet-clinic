import { useTreatments } from './useTreatments';
import { CardImg, Title } from '@/common/atoms';
import { Card } from '@/common/molecules';

const Treatments = () => {
  const treatments = useTreatments();

  return (
    <div className='container mx-auto py-20'>
      <Title>Animals Treatments</Title>
      <div className='cards grid grid-cols-3 py-24 gap-7 justify-center gap-y-14 '>
        {treatments.map(
          ({ id, name, durationInMinutes, image, description }) => (
            <Card title={name} key={id}>
              <>
                <CardImg src={image.platformLink} alt={image.fileName} />
                <div className='content px-2'>
                  <p className='text-sky-900'>
                    Time: {durationInMinutes} minutes
                  </p>
                  <p className='text-sky-800'>{description}</p>
                </div>
              </>
            </Card>
          )
        )}
      </div>
    </div>
  );
};

export default Treatments;
