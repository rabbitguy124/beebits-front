import React from "react";
import { Image, GridItem, VStack, Text, Center } from "@chakra-ui/react";
import { BigNumberish } from "@ethersproject/bignumber";

interface BeebitItemProps {
  imageURL: string;
  id: number;
  type: string;
  price?: BigNumberish;
}

const BeebitItem = React.forwardRef<HTMLDivElement, BeebitItemProps>(
  ({ imageURL, id, type, price }, ref) => {
    return (
      <GridItem overflow="hidden" p="1.6rem" cursor="pointer" ref={ref}>
        <Image
          roundedTop="lg"
          h="22.4rem"
          w="100%"
          objectFit="cover"
          src={imageURL}
          alt={`Beebit-${id}`}
          fallbackSrc="/dummyBeebits.png"
        />
        <VStack
          alignItems="flex-start"
          spacing="0 !important"
          roundedBottom="lg"
          border="1px solid rgba(0, 0, 0, 0.1)"
          borderTop="none"
          padding="1.6rem"
          position="relative"
        >
          <Text textAlign="left" fontSize="2.25rem" fontWeight="bold">
            # {id}
          </Text>
          <Text>{type}</Text>
          {price && (
            <Center
              minW="30%"
              position="absolute"
              top="1.6rem"
              right="1rem"
              py=".5rem"
              px="1rem"
              background="#ffba00"
              rounded="full"
            >
              <Text fontWeight="bold" fontSize="1.2rem">
                1.5 BBN
              </Text>
            </Center>
          )}
        </VStack>
      </GridItem>
    );
  }
);

export default BeebitItem;
