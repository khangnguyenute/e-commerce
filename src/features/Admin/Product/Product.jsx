import { productService } from "@services/index";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import AdminProductHeaderAction from "./Components/HeaderAction";
import AdminProductTable from "./Components/Table";
import AdminProductModificationModal from "./Components/ModificationModal";
import useToast from "@hooks/useToast";
import useDocumentTitle from "@hooks/useDocumentTitle";
import ContentWrapper from "@common/Layout/Components/ContentWrapper";
import { ConfirmationModal } from "@common/Components/Modal";

const AdminProductManagement = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [productData, setProductData] = useState([]);
  const [isShowModificationModal, setIsShowModificationModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [queryParams, setQueryParams] = useState();
  const [totalRows, setTotalRows] = useState(0);

  const selectedProduct = useMemo(() => {
    return productData.find((item) => item._id === selectedProductId) ?? null;
  }, [selectedProductId, productData]);

  const handleClickAddButton = useCallback(() => {
    setIsShowModificationModal(true);
  }, []);

  const handleClickEditButton = useCallback((id) => {
    setSelectedProductId(id ?? null);
    setIsShowModificationModal(true);
  }, []);

  const handleClickDeleteButton = useCallback((id) => {
    setSelectedProductId(id ?? null);
    setIsShowDeleteModal(true);
  }, []);

  const fetchData = useCallback(async () => {
    if (!queryParams) {
      return;
    }
    setIsLoading(true);

    try {
      const { data, meta } = await productService.getProducts(queryParams);

      setProductData(data);
      setTotalRows(meta.total);
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, t, toast]);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      await productService.deleteProductById(selectedProduct?._id);

      toast.success(t("deleteProductSuccessfully"));
      fetchData();
    } catch (error) {
      toast.error(t("unknown"));
    } finally {
      setIsShowDeleteModal(false);
    }
  }, [fetchData, selectedProduct, t, toast]);

  const handleCloseModal = useCallback(() => {
    setIsShowModificationModal(false);
    setIsShowDeleteModal(false);
    setSelectedProductId(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useDocumentTitle(t("productManagement"));

  return (
    <ContentWrapper
      title={t("productManagement")}
      actions={<AdminProductHeaderAction onClickAdd={handleClickAddButton} />}
    >
      <AdminProductTable
        data={productData}
        isLoading={isLoading}
        totalRows={totalRows}
        onClickEdit={handleClickEditButton}
        onClickDelete={handleClickDeleteButton}
        onChangeState={setQueryParams}
      />

      <ConfirmationModal
        title={t("deleteProduct", { name: selectedProduct?.name })}
        message={t("deleteProductMessage")}
        isOpen={isShowDeleteModal}
        status="danger"
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <AdminProductModificationModal
        isOpen={isShowModificationModal}
        product={selectedProduct}
        onCreate={productService.createProduct}
        onCreated={fetchData}
        onEdit={productService.updateProductById}
        onEdited={fetchData}
        onClose={handleCloseModal}
      />
    </ContentWrapper>
  );
};

export default memo(AdminProductManagement);
