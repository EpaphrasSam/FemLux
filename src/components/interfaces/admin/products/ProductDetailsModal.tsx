"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { Star } from "lucide-react";
import { formatCurrency } from "@/helpers";
import type { ProductWithRelations } from "@/types/product";
import Carousel from "@/components/ui/Carousel";
import Image from "next/image";
import { cn } from "@/helpers/utils";
import ReviewsSection from "@/components/ui/ReviewsSection";
import { calculateAverageRating, calculateStars } from "@/helpers/rating";

interface ProductDetailsModalProps {
  product: ProductWithRelations | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
}: ProductDetailsModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState("details");
  const mainCarouselRef = React.useRef<{
    scrollTo: (index: number) => void;
  } | null>(null);

  if (!product) {
    return null;
  }

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    mainCarouselRef.current?.scrollTo(index);
  };

  const rating = calculateAverageRating(product.reviews);
  const stars = () => calculateStars(rating);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[95vh]",
        body: "p-0",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                {product.isNew && (
                  <Chip color="success" size="sm" variant="flat">
                    New
                  </Chip>
                )}
              </div>
              {product.reviews && product.reviews.length > 0 && (
                <div className="flex items-center gap-2 text-default-500">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>{product._count.reviews.toLocaleString()} reviews</span>
                </div>
              )}
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key.toString())}
                variant="underlined"
                fullWidth
                classNames={{
                  tabList: "gap-6",
                  cursor: "w-full bg-primary",
                  tab: "max-w-fit px-2 h-12",
                  tabContent: "group-data-[selected=true]:text-primary",
                }}
              >
                <Tab key="details" title="Details" className="px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                      <div className="relative w-full">
                        <Carousel
                          ref={mainCarouselRef}
                          showControls
                          showIndicators
                          slideWidth="100%"
                          className="w-full"
                          loop
                          onSelect={setSelectedImageIndex}
                        >
                          {product.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative w-full flex-[0_0_100%]"
                            >
                              <div className="relative aspect-square w-full">
                                <Image
                                  src={image}
                                  alt={`Product Image ${idx + 1}`}
                                  fill
                                  priority={idx === 0}
                                  className="object-cover rounded-lg"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          ))}
                        </Carousel>
                      </div>
                      <div className="relative w-full h-24">
                        <Carousel
                          showControls
                          showIndicators={false}
                          slideWidth="20%"
                          className="w-full h-full"
                          loop
                        >
                          {product.images.map((image, idx) => (
                            <div
                              key={idx}
                              className="relative w-full flex-[0_0_20%] px-1"
                            >
                              <div
                                className={cn(
                                  "relative aspect-square w-full cursor-pointer rounded-md overflow-hidden",
                                  selectedImageIndex === idx
                                    ? "ring-2 ring-primary"
                                    : "ring-1 ring-gray-200"
                                )}
                                onClick={() => handleThumbnailClick(idx)}
                              >
                                <Image
                                  src={image}
                                  alt={`Thumbnail ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 20vw, 10vw"
                                />
                              </div>
                            </div>
                          ))}
                        </Carousel>
                      </div>
                    </div>

                    {/* Right Column - Product Details */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold mb-2">
                          Description
                        </h4>
                        <p className="text-default-500">
                          {product.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Category</h4>
                        <p className="capitalize">{product.category.name}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold mb-2">Variants</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[400px]">
                            <thead>
                              <tr className="text-left border-b border-default-200">
                                <th className="p-2">Size</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.variants.map((variant) => (
                                <tr
                                  key={variant.id}
                                  className="border-b border-default-100"
                                >
                                  <td className="p-2">{variant.size}</td>
                                  <td className="p-2">
                                    {formatCurrency(variant.price)}
                                  </td>
                                  <td className="p-2">{variant.stock}</td>
                                  <td className="p-2">
                                    <Chip
                                      className="capitalize"
                                      color={
                                        variant.stock === 0
                                          ? "danger"
                                          : variant.stock <= 5
                                          ? "warning"
                                          : "success"
                                      }
                                      size="sm"
                                      variant="flat"
                                    >
                                      {variant.stock === 0
                                        ? "Out of Stock"
                                        : variant.stock <= 5
                                        ? "Low Stock"
                                        : "In Stock"}
                                    </Chip>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab key="reviews" title="Reviews" className="px-6">
                  <ReviewsSection
                    productId={product.id}
                    reviews={product.reviews?.map((review) => ({
                      ...review,
                      profile: review.profile
                        ? {
                            fullName: review.profile.fullName,
                            avatarUrl: review.profile.avatarUrl,
                          }
                        : null,
                    }))}
                    rating={rating}
                    reviewCount={product._count.reviews}
                    stars={stars()}
                    hideReviewButton
                  />
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
