import {
  Box,
  Button,
  Icon,
  Paper,
  Slider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import "../css/styles.css";

interface CropperModalProps {
  src: string;
  setPreview: (url: string | null) => void;
  cancelPhoto: () => void;
  onSave: (blob: Blob, state?: "original" | "edição" | "preview") => void;
}

export const CropperModal: React.FC<CropperModalProps> = ({
  src,
  setPreview,
  cancelPhoto,
  onSave,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const xlDown = useMediaQuery(theme.breakpoints.up("md"));
  const [slideValue, setSlideValue] = useState(10);
  const cropRef = useRef<AvatarEditor>(null);

  // Handle save
  const handleSave = async () => {
    if (cropRef.current) {
      const canvas = cropRef.current.getImage();
      canvas.toBlob((blob) => {
        if (blob) {
          onSave(blob, "preview");
          setPreview(URL.createObjectURL(blob));
        }
      });
    }
  };

  // Handle scroll to change slider value
  const handleWheel = (event: React.WheelEvent) => {
    const delta = Math.sign(event.deltaY);
    setSlideValue((prev) => {
      const newValue = prev - delta;
      return Math.min(Math.max(newValue, 10), 50);
    });
  };

  return (
    <Box
      sx={{
        width: smDown ? "80%" : mdDown ? "30%" : "30%",
        height: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onWheel={handleWheel}
      >
        <AvatarEditor
          ref={cropRef}
          image={src}
          className="avatar-editor"
          style={{ width: "100%", height: "100%" }}
          border={50}
          borderRadius={150}
          color={[0, 0, 0, 0.72]}
          scale={slideValue / 10}
          rotate={0}
        />
      </Box>

      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        padding={2}
        gap={2}
      >
        <Box
          sx={{
            width: "100%",
            padding: "16px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "8px",
            boxShadow: theme.shadows[2],
            [theme.breakpoints.down("sm")]: {
              width: "14rem",
              padding: "8px",
              backgroundColor: theme.palette.background.default,
            },
            [theme.breakpoints.between("sm", "md")]: {
              width: "12rem",
              padding: "12px",
              backgroundColor: theme.palette.background.paper,
            },
            [theme.breakpoints.up("md")]: {
              width: "12rem",
              padding: "16px",
              backgroundColor: theme.palette.background.paper,
            },
          }}
          justifyContent="center"
          alignItems="center"
          display="flex"
          component={Paper}
          variant="outlined"
          padding={1}
        >
          <Slider
            min={10}
            max={50}
            sx={{
              margin: "0 auto",
              width: "80%",
              color: theme.palette.primary.dark,
            }}
            size="medium"
            defaultValue={slideValue}
            value={slideValue}
            onChange={(_, value) => setSlideValue(value as number)}
          />
        </Box>

        <Box
          width="100%"
          justifyContent="center"
          alignItems="center"
          display="flex"
          flexDirection={xlDown ? "column": "row"}
          gap={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSave}
            startIcon={<Icon>save</Icon>}
            sx={{
              "& button": {
                fontSize: "1rem",
                padding: "8px 16px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "200px",
                "& isMobile": {
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                },
                "& isTablet": {
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                },
                "& isDesktop": {
                  fontSize: "1rem",
                  padding: "8px 16px",
                },
              },
            }}
          >
            Salvar
          </Button>
          <Button
            // size="small"
            color="error"
            variant="contained"
            onClick={cancelPhoto}
            startIcon={<Icon>close</Icon>}
            sx={{
              "& button": {
                fontSize: "1rem",
                padding: "8px 16px",
                margin: "0 auto",
                width: "100%",
                maxWidth: "200px",
                "& isMobile": {
                  fontSize: "0.75rem",
                  padding: "4px 8px",
                },
                "& isTablet": {
                  fontSize: "0.875rem",
                  padding: "6px 12px",
                },
                "& isDesktop": {
                  fontSize: "1rem",
                  padding: "8px 16px",
                },
              },
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
