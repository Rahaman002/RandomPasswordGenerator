import React, { useState } from 'react';
import {
  Center,
  Box,
  Stack,
  Checkbox,
  CheckboxGroup,
  Button,
  Input,
  Heading,
  VStack,
  HStack,
  Select,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Password() {
  const [password, setPassword] = useState('');
  const [selectedCriteria, setSelectedCriteria] = useState([]);
  const [passwordLength, setPasswordLength] = useState(8); // Default password length

  const handleCheckboxChange = (values) => {
    setSelectedCriteria(values);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => {
        toast.success('Copied successfully!');
      },
      () => {
        toast.error('Error copying to clipboard!');
      }
    );
  };

  const generatePassword = () => {
    const criteriaOptions = {
      UpperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      LowerCase: 'abcdefghijklmnopqrstuvwxyz',
      Numbers: '0123456789',
      Symbols: '!@#$%^&*()_+[]{}|;:,.<>?',
    };

    let newPassword = '';

    selectedCriteria.forEach((criteria) => {
      newPassword += criteriaOptions[criteria];
    });

    newPassword = newPassword || 'Please select criteria';
    newPassword = shuffleString(newPassword);
    newPassword = newPassword.slice(0, passwordLength);

    setPassword(newPassword);
  };

  const shuffleString = (str) => {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  return (
    <div>
      <Center bg="white" h="100px" color="black" mt="70" mx="90" py="300">
        <Box w="100%" p={4} color="black">
          <Center>
            <VStack>
            <Heading as='h2' size='2xl' >
                Random Password Generator
            </Heading>
              <HStack>
                <Input
                  placeholder="Generated Password"
                  size="lg"
                  width="auto"
                  isReadOnly
                  borderColor={'black'}
                  value={password}
                  isRound
                  _hover={{ border: 'black' }}
                  mt='15'
                />
                <Button
                  isRound={true}
                  variant='solid'
                  colorScheme='teal'
                  aria-label='Done'
                  fontSize='20px'
                  onClick={copyToClipboard}
                  mt='15'
                >
                  <CopyIcon />
                </Button>
              </HStack>

              <Stack spacing={[1, 5]} direction={['row']}>
                <CheckboxGroup
                  colorScheme="green"
                  defaultValue={[]}
                  onChange={handleCheckboxChange}
                >
                  <Stack spacing={[1, 5]} direction={['column']}>
                    <Checkbox value="UpperCase" borderColor={'black'}>
                      UpperCase
                    </Checkbox>
                    <Checkbox value="LowerCase" borderColor={'black'}>
                      LowerCase
                    </Checkbox>
                  </Stack>
                  <Stack spacing={[1, 5]} direction={['column']}>
                    <Checkbox value="Numbers" borderColor={'black'}>
                      Numbers
                    </Checkbox>
                    <Checkbox value="Symbols" borderColor={'black'}>
                      Symbols
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Stack>
            </VStack>
          </Center>
          <Center>
            <VStack>
              <Select
                placeholder="Select password length"
                borderColor="black"
                mt="6"
                onChange={(e) => setPasswordLength(parseInt(e.target.value))}
              >
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="14">14</option>
              </Select>
              <Button colorScheme="purple" mt="4" onClick={generatePassword}>
                Generate Password
              </Button>
            </VStack>
          </Center>
        </Box>
      </Center>
      <ToastContainer />
    </div>
  );
}

export default Password;
