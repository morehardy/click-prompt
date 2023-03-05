import React from "react";

import { Box, Button, ButtonGroup, CardBody, Heading, Link, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Card, CardFooter, CardHeader } from "@chakra-ui/card";
import Image from "next/image";

import CopyComponent from "@/components/CopyComponent";
import samples from "@/assets/stable-diffusion/samples/index.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { parseStableDiffusionData } from "@/data-processor/SduiParser";

type StableDiffusionSample = {
  name: string;
  author: string;
  category: string;
  homepage: string;
  artists: {
    preview: string;
    prompt: string;
  }[];
  path: string;
};

function Index() {
  function ArticleCard(index: number, sample: StableDiffusionSample, artist: { preview: string; prompt: string }) {
    const parsedPrompt = parseStableDiffusionData(artist.prompt);

    return (
      <Card key={`sample-${index}`}>
        <CardHeader>
          <Heading size='md'>
            {sample.name} -{" "}
            <Link href={sample.homepage} isExternal>
              {sample.author} <ExternalLinkIcon />
            </Link>
          </Heading>
        </CardHeader>
        <CardBody>
          <Image src={artist.preview} alt='' width={512} height={512} />
          <Stack>
            <Text>Model: {parsedPrompt.model}</Text>
            {parsedPrompt.lora.length > 0 && <Text>Lora: {parsedPrompt.lora.join(", ")} </Text>}
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              <CopyComponent value={artist.prompt}>复制</CopyComponent>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }

  let stableDiffusionLink =
    "https://github.com/prompt-engineering/click-prompt/tree/master/src/assets/stable-diffusion/samples";
  return (
    <>
      <Text>
        分享我的 Stable Diffusion 美图：
        <Link href={stableDiffusionLink}>
          Pull Request <ExternalLinkIcon />
        </Link>
      </Text>
      {samples.length > 0 && (
        <Box padding={4} w='100%' maxW='1200px' mx='auto' sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}>
          {samples.map((sample) => sample.artists.map((artist, index) => ArticleCard(index, sample, artist)))}
        </Box>
      )}
    </>
  );
}

export default Index;
