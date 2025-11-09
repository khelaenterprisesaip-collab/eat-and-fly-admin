import * as React from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  ListItemIcon,
  ListItemText,
  Stack,
  Box,
  Checkbox,
  Divider
} from '@mui/material';
import { ArrowLeft, ArrowRight } from 'iconsax-react';

const NestedSelect = ({
  selectedScores,
  setSelectedScores,
  selectedItems,
  setSelectedItems,
  initialValue,
  handleClose,
  open,
  setError,
  disabled
}: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedTest, setSelectedTest] = React.useState<any>('');
  const [checkedValue, setCheckedValue] = React.useState();

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTest('');
  };

  const handleCheckboxChange = (test: any) => {
    const reset: any = initialValue;
    setSelectedItems({
      ...selectedItems,
      [test]: !selectedItems[test]
    });

    if (!selectedItems[test] === false) {
      setSelectedScores({
        ...selectedScores,
        [test]: { ...reset[test], id: selectedScores?.[test]?.id, delete: true }
      });
    } else {
      setSelectedScores({
        ...selectedScores,
        [test]: { ...reset[test], id: selectedScores?.[test]?.id, add: selectedScores?.[test]?.id ? undefined : true }
      });
    }
    setError(false);
  };

  const handleSubMenuOpen = (event: any, test: any) => {
    event.stopPropagation();
    setSelectedTest(test);
  };

  const handleScoreChange = (test: any, scoreType: any) => (event: any) => {
    setSelectedScores({
      ...selectedScores,
      [test]: {
        ...selectedScores[test],
        [scoreType]: event.target.value
      }
    });
  };

  const scoresOptions: any = {
    TOEFL: Array.from({ length: 31 }, (_, i) => i),
    IELTS: Array.from({ length: 19 }, (_, i) => i * 0.5),
    DUOLINGO: Array.from({ length: 111 }, (_, i) => i + 10),
    PTE: Array.from({ length: 9 }, (_, i) => (i + 1) * 10)
  };

  const items = (examType: any) => {
    switch (examType) {
      case 'PTE':
        return ['listening', 'speaking', 'reading', 'writing', 'overall_score'];
      case 'IELTS':
        return ['listening', 'speaking', 'reading', 'writing', 'overall_score'];
      case 'TOEFL':
        return ['listening', 'speaking', 'reading', 'writing', 'overall_score'];
      case 'DUOLINGO':
        return ['overall_score'];
      default:
        return [];
    }
  };

  const getSelectedScoresText = () => {
    let selectedScoresText = '';
    Object.keys(selectedScores).forEach((test) => {
      if (selectedItems[test]) {
        selectedScoresText += `${test}: `;
        items(test).forEach((scoreType) => {
          const capitalizedScoreType =
            scoreType === 'overall_score' ? 'Overall Score' : scoreType.charAt(0).toUpperCase() + scoreType.slice(1);
          selectedScoresText += `${capitalizedScoreType}: ${selectedScores[test][scoreType]}, `;
        });
        selectedScoresText += ' ';
      }
    });
    return selectedScoresText.trim();
  };

  React.useEffect(() => {
    getSelectedScoresText();
  }, [open]);

  return (
    <div>
      <OutlinedInput
        onClick={handleMenuClick}
        value={getSelectedScoresText()}
        required
        disabled={disabled}
        sx={{ height: '40px', width: { xs: '100%', md: '32rem' } }}
        placeholder={'Minimum Language Score'}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        {!selectedTest ? (
          <div>
            {['TOEFL', 'IELTS', 'DUOLINGO', 'PTE'].map((test) => (
              <MenuItem key={test} onClick={() => handleCheckboxChange(test)} sx={{ width: '200px' }}>
                <ListItemIcon>
                  <Checkbox edge="start" checked={selectedItems[test]} tabIndex={-1} disableRipple />
                </ListItemIcon>
                <ListItemText primary={test} />
                {selectedItems[test] && (
                  <IconButton edge="end" onClick={(event) => handleSubMenuOpen(event, test)}>
                    <ArrowRight />
                  </IconButton>
                )}
              </MenuItem>
            ))}
          </div>
        ) : (
          <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Stack direction={'row'} alignItems={'center'} sx={{ mb: 0.5 }}>
              <IconButton onClick={() => setSelectedTest('')}>
                <ArrowLeft />
              </IconButton>
              <Typography variant="h6">{selectedTest}</Typography>
            </Stack>
            {items(selectedTest)?.map((scoreType) => (
              <FormControl key={scoreType} sx={{ mb: 2, minWidth: 120, width: '150px' }}>
                <Typography sx={{ mb: 0.5, textTransform: 'capitalize' }}>
                  {scoreType === 'overall_score' ? 'Overall Score' : scoreType?.charAt(0)?.toUpperCase() + scoreType?.slice(1)}
                </Typography>
                <Select
                  value={selectedScores[selectedTest][scoreType]}
                  onChange={handleScoreChange(selectedTest, scoreType)}
                  input={<OutlinedInput sx={{ height: '40px' }} />}
                >
                  {scoresOptions[selectedTest]?.map((score: any) => (
                    <MenuItem key={score} value={score}>
                      {score}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        )}
      </Menu>
    </div>
  );
};

export default NestedSelect;
