import { Box, Button, Icon, Paper, Slider, useTheme } from '@mui/material';
import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import '../css/styles.css';

interface CropperModalProps {
    src: string;
    setPreview: (url: string | null) => void;
    cancelPhoto: () => void;
    onSave: (blob: Blob, state?: 'original' | 'edição' | 'preview') => void;
}

export const CropperModal: React.FC<CropperModalProps> = ({ src, setPreview, cancelPhoto, onSave }) => {

    const theme = useTheme();

    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef<AvatarEditor>(null);

    // Handle save
    const handleSave = async () => {
        if (cropRef.current) {
            const canvas = cropRef.current.getImage();
            canvas.toBlob(blob => {
                if (blob) {
                    onSave(blob, 'preview');
                    setPreview(URL.createObjectURL(blob));
                }
            });
        }
    };

    // Handle scroll to change slider value
    const handleWheel = (event: React.WheelEvent) => {
        const delta = Math.sign(event.deltaY);
        setSlideValue(prev => {
            const newValue = prev - delta;
            return Math.min(Math.max(newValue, 10), 50);
        });
    };

    return (
        <Box sx={{ width: '60%', height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: '100%', display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center' }} onWheel={handleWheel}>
                <AvatarEditor
                    ref={cropRef}
                    image={src}
                    className="avatar-editor"
                    style={{ width: '100%', height: '100%' }}
                    border={50}
                    borderRadius={150}
                    color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={0}
                />
            </Box>


            <Box width='100%' justifyContent='center' alignItems='center' display='flex' flexDirection='column' padding={2} gap={2}>
                <Box width='100%' justifyContent='center' alignItems='center' display='flex' component={Paper} variant='outlined' padding={1} >
                    <Slider
                        min={10}
                        max={50}
                        sx={{
                            margin: '0 auto',
                            width: '80%',
                            color: theme.palette.primary.dark
                        }}
                        size="medium"
                        defaultValue={slideValue}
                        value={slideValue}
                        onChange={(_, value) => setSlideValue(value as number)}
                    />
                </Box>

                <Box width='100%' justifyContent='center' alignItems='center' display='flex' gap={2} >
                    <Button
                        color='primary'
                        size="small"
                        variant="contained"
                        onClick={handleSave}
                        startIcon={<Icon>save</Icon>}
                    >
                        Salvar
                    </Button>
                    <Button
                        size="small"
                        color='error'
                        variant="outlined"
                        onClick={cancelPhoto}
                        startIcon={<Icon>close</Icon>}
                    >
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
