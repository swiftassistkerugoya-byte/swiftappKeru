import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { ShoppingCart, Briefcase, Chrome as Home, GraduationCap, Heart, ArrowRight, X, MapPin, Clock, DollarSign } from 'lucide-react-native';

interface Service {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  basePrice: string;
  services: string[];
}

export default function ServicesScreen() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    pickup: '',
    delivery: '',
    description: '',
    urgency: 'normal',
  });

  const services: Service[] = [
    {
      id: 1,
      name: 'Shopping & Delivery',
      description: 'Get your groceries, medicines, and essentials delivered',
      icon: ShoppingCart,
      color: '#10b981',
      basePrice: 'From KSh 150',
      services: [
        'Grocery Shopping',
        'Pharmacy Pickups',
        'Restaurant Delivery',
        'Supermarket Shopping',
        'Fresh Market Shopping',
      ],
    },
    {
      id: 2,
      name: 'Business & Office',
      description: 'Professional errands for your business needs',
      icon: Briefcase,
      color: '#3b82f6',
      basePrice: 'From KSh 200',
      services: [
        'Document Delivery',
        'Bank Errands',
        'Office Supplies',
        'Meeting Preparations',
        'Business Registration',
      ],
    },
    {
      id: 3,
      name: 'Household Support',
      description: 'Daily household tasks made easy',
      icon: Home,
      color: '#f59e0b',
      basePrice: 'From KSh 300',
      services: [
        'Laundry Services',
        'Gas Delivery',
        'Water Delivery',
        'Bill Payments',
        'Utility Top-ups',
      ],
    },
    {
      id: 4,
      name: 'Student Support',
      description: 'Academic and campus assistance',
      icon: GraduationCap,
      color: '#8b5cf6',
      basePrice: 'From KSh 100',
      services: [
        'Document Printing',
        'Assignment Submission',
        'Stationery Shopping',
        'Book Collection',
        'Library Services',
      ],
    },
    {
      id: 5,
      name: 'Personal & Lifestyle',
      description: 'Personal errands and lifestyle services',
      icon: Heart,
      color: '#ef4444',
      basePrice: 'From KSh 120',
      services: [
        'Parcel Collection',
        'Event Tickets',
        'Airtime & Data',
        'Gift Shopping',
        'Personal Shopping',
      ],
    },
  ];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleRequestService = () => {
    setShowRequestForm(true);
  };

  const handleSubmitRequest = () => {
    // Handle form submission
    console.log('Request submitted:', requestForm);
    setShowRequestForm(false);
    setSelectedService(null);
    setRequestForm({
      pickup: '',
      delivery: '',
      description: '',
      urgency: 'normal',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>Choose the service you need</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => handleServiceSelect(service)}
            activeOpacity={0.8}
          >
            <View style={styles.serviceHeader}>
              <View style={[styles.serviceIcon, { backgroundColor: service.color + '20' }]}>
                <service.icon size={32} color={service.color} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDescription}>{service.description}</Text>
                <Text style={styles.servicePrice}>{service.basePrice}</Text>
              </View>
              <ArrowRight size={24} color="#9ca3af" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Service Detail Modal */}
      <Modal
        visible={!!selectedService}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedService(null)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedService?.name}</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.serviceDetail}>
              <View style={[styles.largeIcon, { backgroundColor: selectedService?.color + '20' }]}>
                {selectedService?.icon && (
                  <selectedService.icon size={48} color={selectedService.color} />
                )}
              </View>
              <Text style={styles.serviceDetailTitle}>{selectedService?.name}</Text>
              <Text style={styles.serviceDetailDescription}>
                {selectedService?.description}
              </Text>
              <Text style={styles.serviceDetailPrice}>{selectedService?.basePrice}</Text>
            </View>

            <View style={styles.servicesListContainer}>
              <Text style={styles.servicesListTitle}>Available Services</Text>
              {selectedService?.services.map((item, index) => (
                <View key={index} style={styles.serviceItem}>
                  <View style={styles.serviceDot} />
                  <Text style={styles.serviceItemText}>{item}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.requestButton} onPress={handleRequestService}>
            <Text style={styles.requestButtonText}>Request This Service</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Request Form Modal */}
      <Modal visible={showRequestForm} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowRequestForm(false)}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Request Service</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={styles.modalContent}>
            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Pickup Location</Text>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#64748b" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Where should we pick up from?"
                    value={requestForm.pickup}
                    onChangeText={(text) => setRequestForm({ ...requestForm, pickup: text })}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Delivery Location</Text>
                <View style={styles.inputContainer}>
                  <MapPin size={20} color="#64748b" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Where should we deliver to?"
                    value={requestForm.delivery}
                    onChangeText={(text) => setRequestForm({ ...requestForm, delivery: text })}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Service Description</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  placeholder="Describe what you need in detail..."
                  value={requestForm.description}
                  onChangeText={(text) => setRequestForm({ ...requestForm, description: text })}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Urgency</Text>
                <View style={styles.urgencyContainer}>
                  {[
                    { value: 'normal', label: 'Normal', time: '1-2 hours' },
                    { value: 'urgent', label: 'Urgent', time: '30-60 mins' },
                    { value: 'asap', label: 'ASAP', time: '15-30 mins' },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.urgencyOption,
                        requestForm.urgency === option.value && styles.urgencySelected,
                      ]}
                      onPress={() => setRequestForm({ ...requestForm, urgency: option.value })}
                    >
                      <Clock size={16} color={requestForm.urgency === option.value ? '#fff' : '#64748b'} />
                      <View style={styles.urgencyText}>
                        <Text
                          style={[
                            styles.urgencyLabel,
                            requestForm.urgency === option.value && styles.urgencyLabelSelected,
                          ]}
                        >
                          {option.label}
                        </Text>
                        <Text
                          style={[
                            styles.urgencyTime,
                            requestForm.urgency === option.value && styles.urgencyTimeSelected,
                          ]}
                        >
                          {option.time}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitRequest}>
            <DollarSign size={20} color="#fff" />
            <Text style={styles.submitButtonText}>Get Quote & Submit</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 20,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10b981',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceDetail: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  largeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceDetailTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  serviceDetailDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  serviceDetailPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#10b981',
  },
  servicesListContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  servicesListTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  serviceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
  },
  serviceItemText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },
  requestButton: {
    backgroundColor: '#2563eb',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  form: {
    paddingVertical: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  urgencyContainer: {
    gap: 12,
  },
  urgencyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  urgencySelected: {
    backgroundColor: '#2563eb',
  },
  urgencyText: {
    flex: 1,
  },
  urgencyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  urgencyLabelSelected: {
    color: '#fff',
  },
  urgencyTime: {
    fontSize: 14,
    color: '#64748b',
  },
  urgencyTimeSelected: {
    color: '#dbeafe',
  },
  submitButton: {
    backgroundColor: '#10b981',
    marginHorizontal: 20,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});