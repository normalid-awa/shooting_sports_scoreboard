export default {
  __version: '7.0.16',
  'hydrator-verification_4000-full-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity verification ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.identifier === null) {
        entity.identifier = null;
      } else if (typeof data.identifier !== 'undefined') {
        entity.identifier = data.identifier;
      }
      if (data.value === null) {
        entity.value = null;
      } else if (typeof data.value !== 'undefined') {
        entity.value = data.value;
      }
      if (data.expiresAt === null) {
        entity.expiresAt = null;
      } else if (typeof data.expiresAt !== 'undefined') {
        if (data.expiresAt instanceof Date) {
          entity.expiresAt = data.expiresAt;
        } else if (typeof data.expiresAt === 'number' || data.expiresAt.includes('+') || data.expiresAt.lastIndexOf('-') > 10 || data.expiresAt.endsWith('Z')) {
          entity.expiresAt = new Date(data.expiresAt);
        } else {
          entity.expiresAt = new Date(data.expiresAt + 'Z');
        }
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
    }
  },
  'hydrator-verification_4000-full-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity verification ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.identifier === null) {
        entity.identifier = null;
      } else if (typeof data.identifier !== 'undefined') {
        entity.identifier = data.identifier;
      }
      if (data.value === null) {
        entity.value = null;
      } else if (typeof data.value !== 'undefined') {
        entity.value = data.value;
      }
      if (data.expiresAt === null) {
        entity.expiresAt = null;
      } else if (typeof data.expiresAt !== 'undefined') {
        if (data.expiresAt instanceof Date) {
          entity.expiresAt = data.expiresAt;
        } else if (typeof data.expiresAt === 'number' || data.expiresAt.includes('+') || data.expiresAt.lastIndexOf('-') > 10 || data.expiresAt.endsWith('Z')) {
          entity.expiresAt = new Date(data.expiresAt);
        } else {
          entity.expiresAt = new Date(data.expiresAt + 'Z');
        }
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
    }
  },
  'comparator-verification_4000': function(compareArrays, compareBooleans, compareBuffers, compareObjects, equals) {
    // compiled comparator for entity verification
    return function(last, current, options) {
      const diff = {};
      if (current.id === null && last.id === undefined) {
        diff.id = current.id;
      } else if (current.id == null && last.id == null) {
    
      } else if ((current.id != null && last.id == null) || (current.id == null && last.id != null)) {
        diff.id = current.id;
      } else if (last.id !== current.id) {
        diff.id = current.id;
      }
    
      if (current.identifier === null && last.identifier === undefined) {
        diff.identifier = current.identifier;
      } else if (current.identifier == null && last.identifier == null) {
    
      } else if ((current.identifier != null && last.identifier == null) || (current.identifier == null && last.identifier != null)) {
        diff.identifier = current.identifier;
      } else if (last.identifier !== current.identifier) {
        diff.identifier = current.identifier;
      }
    
      if (current.value === null && last.value === undefined) {
        diff.value = current.value;
      } else if (current.value == null && last.value == null) {
    
      } else if ((current.value != null && last.value == null) || (current.value == null && last.value != null)) {
        diff.value = current.value;
      } else if (last.value !== current.value) {
        diff.value = current.value;
      }
    
      if (current.expiresAt === null && last.expiresAt === undefined) {
        diff.expiresAt = current.expiresAt;
      } else if (current.expiresAt == null && last.expiresAt == null) {
    
      } else if ((current.expiresAt != null && last.expiresAt == null) || (current.expiresAt == null && last.expiresAt != null)) {
        diff.expiresAt = current.expiresAt;
      } else if (last.expiresAt.valueOf() !== current.expiresAt.valueOf()) {
        diff.expiresAt = current.expiresAt;
      }
    
      if (current.createdAt === null && last.createdAt === undefined) {
        diff.createdAt = current.createdAt;
      } else if (current.createdAt == null && last.createdAt == null) {
    
      } else if ((current.createdAt != null && last.createdAt == null) || (current.createdAt == null && last.createdAt != null)) {
        diff.createdAt = current.createdAt;
      } else if (last.createdAt.valueOf() !== current.createdAt.valueOf()) {
        diff.createdAt = current.createdAt;
      }
    
      if (current.updatedAt === null && last.updatedAt === undefined) {
        diff.updatedAt = current.updatedAt;
      } else if (current.updatedAt == null && last.updatedAt == null) {
    
      } else if ((current.updatedAt != null && last.updatedAt == null) || (current.updatedAt == null && last.updatedAt != null)) {
        diff.updatedAt = current.updatedAt;
      } else if (last.updatedAt.valueOf() !== current.updatedAt.valueOf()) {
        diff.updatedAt = current.updatedAt;
      }
    
    if (options?.includeInverseSides) {
    }
      return diff;
    }
  },
  'snapshotGenerator-verification_4000': function(clone, cloneEmbeddable, convertToDatabaseValue_id, processDateProperty) {
    return function(entity) {
      const ret = {};
      if (typeof entity.id !== 'undefined') {
        ret.id = convertToDatabaseValue_id(entity.id);
      }
    
      if (typeof entity.identifier !== 'undefined') {
        ret.identifier = entity.identifier;
      }
    
      if (typeof entity.value !== 'undefined') {
        ret.value = entity.value;
      }
    
      if (typeof entity.expiresAt !== 'undefined') {
        ret.expiresAt = clone(processDateProperty(entity.expiresAt));
      }
    
      if (typeof entity.createdAt !== 'undefined') {
        ret.createdAt = clone(processDateProperty(entity.createdAt));
      }
    
      if (typeof entity.updatedAt !== 'undefined') {
        ret.updatedAt = clone(processDateProperty(entity.updatedAt));
      }
    
      return ret;
    }
  },
  'resultMapper-verification_4000': function(PolymorphicRef, parseDate) {
    // compiled mapper for entity verification
    return function(result) {
      const ret = {};
      const mapped = {};
      if (typeof result.id !== 'undefined') {
        ret.id = result.id;
        mapped.id = true;
      }
      if (typeof result.identifier !== 'undefined') {
        ret.identifier = result.identifier;
        mapped.identifier = true;
      }
      if (typeof result.value !== 'undefined') {
        ret.value = result.value;
        mapped.value = true;
      }
      if (typeof result.expires_at !== 'undefined') {
        if (result.expires_at == null || result.expires_at instanceof Date) {
          ret.expiresAt = result.expires_at;
        } else if (typeof result.expires_at === 'bigint') {
          ret.expiresAt = parseDate(Number(result.expires_at));
        } else if (typeof result.expires_at === 'number' || result.expires_at.includes('+') || result.expires_at.lastIndexOf('-') > 10 || result.expires_at.endsWith('Z')) {
          ret.expiresAt = parseDate(result.expires_at);
        } else {
          ret.expiresAt = parseDate(result.expires_at + 'Z');
        }
        mapped.expires_at = true;
      }
      if (typeof result.created_at !== 'undefined') {
        if (result.created_at == null || result.created_at instanceof Date) {
          ret.createdAt = result.created_at;
        } else if (typeof result.created_at === 'bigint') {
          ret.createdAt = parseDate(Number(result.created_at));
        } else if (typeof result.created_at === 'number' || result.created_at.includes('+') || result.created_at.lastIndexOf('-') > 10 || result.created_at.endsWith('Z')) {
          ret.createdAt = parseDate(result.created_at);
        } else {
          ret.createdAt = parseDate(result.created_at + 'Z');
        }
        mapped.created_at = true;
      }
      if (typeof result.updated_at !== 'undefined') {
        if (result.updated_at == null || result.updated_at instanceof Date) {
          ret.updatedAt = result.updated_at;
        } else if (typeof result.updated_at === 'bigint') {
          ret.updatedAt = parseDate(Number(result.updated_at));
        } else if (typeof result.updated_at === 'number' || result.updated_at.includes('+') || result.updated_at.lastIndexOf('-') > 10 || result.updated_at.endsWith('Z')) {
          ret.updatedAt = parseDate(result.updated_at);
        } else {
          ret.updatedAt = parseDate(result.updated_at + 'Z');
        }
        mapped.updated_at = true;
      }
      for (let k in result) { if (Object.hasOwn(result, k) && !mapped[k] && ret[k] === undefined) ret[k] = result[k]; }
      return ret;
    }
  },
  'hydrator-verification_4000-reference-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity verification ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'hydrator-verification_4000-reference-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity verification ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'pkGetter-verification_4000': function(isEntityOrRef) {
    // compiled pk getter for entity verification
    return function(entity) {
      return entity.id;
    }
  },
  'pkGetterConverted-verification_4000': function(isEntityOrRef, convertToDatabaseValue_id) {
    // compiled pk getter (with converted custom types) for entity verification
    return function(entity) {
      return convertToDatabaseValue_id(entity.id);
    }
  },
  'pkSerializer-verification_4000': function(isEntityOrRef, getCompositeKeyValue, getPrimaryKeyHash, convertToDatabaseValue_id) {
    // compiled pk serializer for entity verification
    return function(entity) {
      const val_0 = convertToDatabaseValue_id(entity.id);
      return getPrimaryKeyHash(val_0);
    }
  },
  'hydrator-user_1000-full-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, shooter_profile_21) {
    // compiled hydrator for entity user ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.name === null) {
        entity.name = null;
      } else if (typeof data.name !== 'undefined') {
        entity.name = data.name;
      }
      if (data.email === null) {
        entity.email = null;
      } else if (typeof data.email !== 'undefined') {
        entity.email = data.email;
      }
      if (data.emailVerified === null) {
        entity.emailVerified = null;
      } else if (typeof data.emailVerified !== 'undefined') {
        entity.emailVerified = !!data.emailVerified;
      }
      if (data.image === null) {
        entity.image = null;
      } else if (typeof data.image !== 'undefined') {
        entity.image = data.image;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
      const createCollectionItem_shooterProfiles = (value, entity) => {
        if (isPrimaryKey(value, false)) return factory.createReference(shooter_profile_21, value, { convertCustomTypes, schema, normalizeAccessors, merge: true });
        if (value && isEntity(value)) return value;
        return factory.create(shooter_profile_21, value, { newEntity, convertCustomTypes, schema, normalizeAccessors, merge: true });
      }
      if (data.shooterProfiles && !Array.isArray(data.shooterProfiles) && typeof data.shooterProfiles === 'object') {
        data.shooterProfiles = [data.shooterProfiles];
      }
      if (Array.isArray(data.shooterProfiles)) {
        const items = data.shooterProfiles.map(value => createCollectionItem_shooterProfiles(value, entity));
        const coll = Collection.create(entity, 'shooterProfiles', items, newEntity);
        if (newEntity) {
          coll.setDirty();
        } else {
          coll.takeSnapshot(true);
        }
      } else if (!entity.shooterProfiles && data.shooterProfiles instanceof Collection) {
        entity.shooterProfiles = data.shooterProfiles;
      } else if (!entity.shooterProfiles) {
        const coll = Collection.create(entity, 'shooterProfiles', undefined, newEntity);
        coll.setDirty(false);
      }
      if (data.realname === null) {
        entity.realname = null;
      } else if (typeof data.realname !== 'undefined') {
        entity.realname = data.realname;
      }
    }
  },
  'hydrator-user_1000-full-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, shooter_profile_30) {
    // compiled hydrator for entity user ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.name === null) {
        entity.name = null;
      } else if (typeof data.name !== 'undefined') {
        entity.name = data.name;
      }
      if (data.email === null) {
        entity.email = null;
      } else if (typeof data.email !== 'undefined') {
        entity.email = data.email;
      }
      if (data.emailVerified === null) {
        entity.emailVerified = null;
      } else if (typeof data.emailVerified !== 'undefined') {
        entity.emailVerified = !!data.emailVerified;
      }
      if (data.image === null) {
        entity.image = null;
      } else if (typeof data.image !== 'undefined') {
        entity.image = data.image;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
      const createCollectionItem_shooterProfiles = (value, entity) => {
        if (isPrimaryKey(value, false)) return factory.createReference(shooter_profile_30, value, { convertCustomTypes, schema, normalizeAccessors, merge: true });
        if (value && isEntity(value)) return value;
        return factory.create(shooter_profile_30, value, { newEntity, convertCustomTypes, schema, normalizeAccessors, merge: true });
      }
      if (data.shooterProfiles && !Array.isArray(data.shooterProfiles) && typeof data.shooterProfiles === 'object') {
        data.shooterProfiles = [data.shooterProfiles];
      }
      if (Array.isArray(data.shooterProfiles)) {
        const items = data.shooterProfiles.map(value => createCollectionItem_shooterProfiles(value, entity));
        const coll = Collection.create(entity, 'shooterProfiles', items, newEntity);
        if (newEntity) {
          coll.setDirty();
        } else {
          coll.takeSnapshot(true);
        }
      } else if (!entity.shooterProfiles && data.shooterProfiles instanceof Collection) {
        entity.shooterProfiles = data.shooterProfiles;
      } else if (!entity.shooterProfiles) {
        const coll = Collection.create(entity, 'shooterProfiles', undefined, newEntity);
        coll.setDirty(false);
      }
      if (data.realname === null) {
        entity.realname = null;
      } else if (typeof data.realname !== 'undefined') {
        entity.realname = data.realname;
      }
    }
  },
  'comparator-user_1000': function(compareArrays, compareBooleans, compareBuffers, compareObjects, equals) {
    // compiled comparator for entity user
    return function(last, current, options) {
      const diff = {};
      if (current.id === null && last.id === undefined) {
        diff.id = current.id;
      } else if (current.id == null && last.id == null) {
    
      } else if ((current.id != null && last.id == null) || (current.id == null && last.id != null)) {
        diff.id = current.id;
      } else if (last.id !== current.id) {
        diff.id = current.id;
      }
    
      if (current.name === null && last.name === undefined) {
        diff.name = current.name;
      } else if (current.name == null && last.name == null) {
    
      } else if ((current.name != null && last.name == null) || (current.name == null && last.name != null)) {
        diff.name = current.name;
      } else if (last.name !== current.name) {
        diff.name = current.name;
      }
    
      if (current.email === null && last.email === undefined) {
        diff.email = current.email;
      } else if (current.email == null && last.email == null) {
    
      } else if ((current.email != null && last.email == null) || (current.email == null && last.email != null)) {
        diff.email = current.email;
      } else if (last.email !== current.email) {
        diff.email = current.email;
      }
    
      if (current.emailVerified === null && last.emailVerified === undefined) {
        diff.emailVerified = current.emailVerified;
      } else if (current.emailVerified == null && last.emailVerified == null) {
    
      } else if ((current.emailVerified != null && last.emailVerified == null) || (current.emailVerified == null && last.emailVerified != null)) {
        diff.emailVerified = current.emailVerified;
      } else if (!compareBooleans(last.emailVerified, current.emailVerified)) {
        diff.emailVerified = current.emailVerified;
      }
    
      if (current.image === null && last.image === undefined) {
        diff.image = current.image;
      } else if (current.image == null && last.image == null) {
    
      } else if ((current.image != null && last.image == null) || (current.image == null && last.image != null)) {
        diff.image = current.image;
      } else if (last.image !== current.image) {
        diff.image = current.image;
      }
    
      if (current.createdAt === null && last.createdAt === undefined) {
        diff.createdAt = current.createdAt;
      } else if (current.createdAt == null && last.createdAt == null) {
    
      } else if ((current.createdAt != null && last.createdAt == null) || (current.createdAt == null && last.createdAt != null)) {
        diff.createdAt = current.createdAt;
      } else if (last.createdAt.valueOf() !== current.createdAt.valueOf()) {
        diff.createdAt = current.createdAt;
      }
    
      if (current.updatedAt === null && last.updatedAt === undefined) {
        diff.updatedAt = current.updatedAt;
      } else if (current.updatedAt == null && last.updatedAt == null) {
    
      } else if ((current.updatedAt != null && last.updatedAt == null) || (current.updatedAt == null && last.updatedAt != null)) {
        diff.updatedAt = current.updatedAt;
      } else if (last.updatedAt.valueOf() !== current.updatedAt.valueOf()) {
        diff.updatedAt = current.updatedAt;
      }
    
      if (current.realname === null && last.realname === undefined) {
        diff.realname = current.realname;
      } else if (current.realname == null && last.realname == null) {
    
      } else if ((current.realname != null && last.realname == null) || (current.realname == null && last.realname != null)) {
        diff.realname = current.realname;
      } else if (last.realname !== current.realname) {
        diff.realname = current.realname;
      }
    
    if (options?.includeInverseSides) {
    }
      return diff;
    }
  },
  'snapshotGenerator-user_1000': function(clone, cloneEmbeddable, convertToDatabaseValue_id, processDateProperty) {
    return function(entity) {
      const ret = {};
      if (typeof entity.id !== 'undefined') {
        ret.id = convertToDatabaseValue_id(entity.id);
      }
    
      if (typeof entity.name !== 'undefined') {
        ret.name = entity.name;
      }
    
      if (typeof entity.email !== 'undefined') {
        ret.email = entity.email;
      }
    
      if (typeof entity.emailVerified !== 'undefined') {
        ret.emailVerified = entity.emailVerified;
      }
    
      if (typeof entity.image !== 'undefined') {
        ret.image = entity.image;
      }
    
      if (typeof entity.createdAt !== 'undefined') {
        ret.createdAt = clone(processDateProperty(entity.createdAt));
      }
    
      if (typeof entity.updatedAt !== 'undefined') {
        ret.updatedAt = clone(processDateProperty(entity.updatedAt));
      }
    
      if (typeof entity.realname !== 'undefined') {
        ret.realname = entity.realname;
      }
    
      return ret;
    }
  },
  'resultMapper-user_1000': function(PolymorphicRef, parseDate) {
    // compiled mapper for entity user
    return function(result) {
      const ret = {};
      const mapped = {};
      if (typeof result.id !== 'undefined') {
        ret.id = result.id;
        mapped.id = true;
      }
      if (typeof result.name !== 'undefined') {
        ret.name = result.name;
        mapped.name = true;
      }
      if (typeof result.email !== 'undefined') {
        ret.email = result.email;
        mapped.email = true;
      }
      if (typeof result.email_verified !== 'undefined') {
        ret.emailVerified = result.email_verified == null ? result.email_verified : !!result.email_verified;
        mapped.email_verified = true;
      }
      if (typeof result.image !== 'undefined') {
        ret.image = result.image;
        mapped.image = true;
      }
      if (typeof result.created_at !== 'undefined') {
        if (result.created_at == null || result.created_at instanceof Date) {
          ret.createdAt = result.created_at;
        } else if (typeof result.created_at === 'bigint') {
          ret.createdAt = parseDate(Number(result.created_at));
        } else if (typeof result.created_at === 'number' || result.created_at.includes('+') || result.created_at.lastIndexOf('-') > 10 || result.created_at.endsWith('Z')) {
          ret.createdAt = parseDate(result.created_at);
        } else {
          ret.createdAt = parseDate(result.created_at + 'Z');
        }
        mapped.created_at = true;
      }
      if (typeof result.updated_at !== 'undefined') {
        if (result.updated_at == null || result.updated_at instanceof Date) {
          ret.updatedAt = result.updated_at;
        } else if (typeof result.updated_at === 'bigint') {
          ret.updatedAt = parseDate(Number(result.updated_at));
        } else if (typeof result.updated_at === 'number' || result.updated_at.includes('+') || result.updated_at.lastIndexOf('-') > 10 || result.updated_at.endsWith('Z')) {
          ret.updatedAt = parseDate(result.updated_at);
        } else {
          ret.updatedAt = parseDate(result.updated_at + 'Z');
        }
        mapped.updated_at = true;
      }
      if (typeof result.realname !== 'undefined') {
        ret.realname = result.realname;
        mapped.realname = true;
      }
      for (let k in result) { if (Object.hasOwn(result, k) && !mapped[k] && ret[k] === undefined) ret[k] = result[k]; }
      return ret;
    }
  },
  'hydrator-user_1000-reference-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity user ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'hydrator-user_1000-reference-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity user ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'pkGetter-user_1000': function(isEntityOrRef) {
    // compiled pk getter for entity user
    return function(entity) {
      return entity.id;
    }
  },
  'pkGetterConverted-user_1000': function(isEntityOrRef, convertToDatabaseValue_id) {
    // compiled pk getter (with converted custom types) for entity user
    return function(entity) {
      return convertToDatabaseValue_id(entity.id);
    }
  },
  'pkSerializer-user_1000': function(isEntityOrRef, getCompositeKeyValue, getPrimaryKeyHash, convertToDatabaseValue_id) {
    // compiled pk serializer for entity user
    return function(entity) {
      const val_1 = convertToDatabaseValue_id(entity.id);
      return getPrimaryKeyHash(val_1);
    }
  },
  'hydrator-shooter_profile_0-full-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_38, user_39) {
    // compiled hydrator for entity shooterProfile ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.name === null) {
        entity.name = null;
      } else if (typeof data.name !== 'undefined') {
        entity.name = data.name;
      }
      if (data.sport === null) {
        entity.sport = null;
      } else if (typeof data.sport !== 'undefined') {
        entity.sport = data.sport;
      }
      if (data.identifier === null) {
        entity.identifier = null;
      } else if (typeof data.identifier !== 'undefined') {
        entity.identifier = data.identifier;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_38, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_39, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
    }
  },
  'hydrator-shooter_profile_0-full-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_44, user_45) {
    // compiled hydrator for entity shooterProfile ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.name === null) {
        entity.name = null;
      } else if (typeof data.name !== 'undefined') {
        entity.name = data.name;
      }
      if (data.sport === null) {
        entity.sport = null;
      } else if (typeof data.sport !== 'undefined') {
        entity.sport = data.sport;
      }
      if (data.identifier === null) {
        entity.identifier = null;
      } else if (typeof data.identifier !== 'undefined') {
        entity.identifier = data.identifier;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_44, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_45, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
    }
  },
  'comparator-shooter_profile_0': function(compareArrays, compareBooleans, compareBuffers, compareObjects, equals) {
    // compiled comparator for entity shooterProfile
    return function(last, current, options) {
      const diff = {};
      if (current.id === null && last.id === undefined) {
        diff.id = current.id;
      } else if (current.id == null && last.id == null) {
    
      } else if ((current.id != null && last.id == null) || (current.id == null && last.id != null)) {
        diff.id = current.id;
      } else if (last.id !== current.id) {
        diff.id = current.id;
      }
    
      if (current.name === null && last.name === undefined) {
        diff.name = current.name;
      } else if (current.name == null && last.name == null) {
    
      } else if ((current.name != null && last.name == null) || (current.name == null && last.name != null)) {
        diff.name = current.name;
      } else if (last.name !== current.name) {
        diff.name = current.name;
      }
    
      if (current.sport === null && last.sport === undefined) {
        diff.sport = current.sport;
      } else if (current.sport == null && last.sport == null) {
    
      } else if ((current.sport != null && last.sport == null) || (current.sport == null && last.sport != null)) {
        diff.sport = current.sport;
      } else if (last.sport !== current.sport) {
        diff.sport = current.sport;
      }
    
      if (current.identifier === null && last.identifier === undefined) {
        diff.identifier = current.identifier;
      } else if (current.identifier == null && last.identifier == null) {
    
      } else if ((current.identifier != null && last.identifier == null) || (current.identifier == null && last.identifier != null)) {
        diff.identifier = current.identifier;
      } else if (last.identifier !== current.identifier) {
        diff.identifier = current.identifier;
      }
    
      if (current.user === null && last.user === undefined) {
        diff.user = current.user;
      } else if (current.user == null && last.user == null) {
    
      } else if ((current.user != null && last.user == null) || (current.user == null && last.user != null)) {
        diff.user = current.user;
      } else if (last.user !== current.user) {
        diff.user = current.user;
      }
    
    if (options?.includeInverseSides) {
    }
      return diff;
    }
  },
  'snapshotGenerator-shooter_profile_0': function(clone, cloneEmbeddable, convertToDatabaseValue_id, toArray, EntityIdentifier) {
    return function(entity) {
      const ret = {};
      if (typeof entity.id !== 'undefined') {
        ret.id = convertToDatabaseValue_id(entity.id);
      }
    
      if (typeof entity.name !== 'undefined') {
        ret.name = entity.name;
      }
    
      if (typeof entity.sport !== 'undefined') {
        ret.sport = entity.sport;
      }
    
      if (typeof entity.identifier !== 'undefined') {
        ret.identifier = entity.identifier;
      }
    
      if (typeof entity.user !== 'undefined') {
        if (entity.user === null) {
          ret.user = null;
        } else if (entity.user?.__helper.__identifier && !entity.user.__helper.hasPrimaryKey()) {
          ret.user = entity.user?.__helper.__identifier;
        } else if (typeof entity.user !== 'undefined') {
          ret.user = toArray(entity.user.__helper.getPrimaryKey(true));
        }
      }
    
      return ret;
    }
  },
  'resultMapper-shooter_profile_0': function(PolymorphicRef) {
    // compiled mapper for entity shooterProfile
    return function(result) {
      const ret = {};
      const mapped = {};
      if (typeof result.id !== 'undefined') {
        ret.id = result.id;
        mapped.id = true;
      }
      if (typeof result.name !== 'undefined') {
        ret.name = result.name;
        mapped.name = true;
      }
      if (typeof result.sport !== 'undefined') {
        ret.sport = result.sport;
        mapped.sport = true;
      }
      if (typeof result.identifier !== 'undefined') {
        ret.identifier = result.identifier;
        mapped.identifier = true;
      }
      if (typeof result.user_id !== 'undefined') {
        ret.user = result.user_id;
        mapped.user_id = true;
      }
      for (let k in result) { if (Object.hasOwn(result, k) && !mapped[k] && ret[k] === undefined) ret[k] = result[k]; }
      return ret;
    }
  },
  'hydrator-shooter_profile_0-reference-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity shooterProfile ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'hydrator-shooter_profile_0-reference-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity shooterProfile ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'pkGetter-shooter_profile_0': function(isEntityOrRef) {
    // compiled pk getter for entity shooterProfile
    return function(entity) {
      return entity.id;
    }
  },
  'pkGetterConverted-shooter_profile_0': function(isEntityOrRef, convertToDatabaseValue_id) {
    // compiled pk getter (with converted custom types) for entity shooterProfile
    return function(entity) {
      return convertToDatabaseValue_id(entity.id);
    }
  },
  'pkSerializer-shooter_profile_0': function(isEntityOrRef, getCompositeKeyValue, getPrimaryKeyHash, convertToDatabaseValue_id) {
    // compiled pk serializer for entity shooterProfile
    return function(entity) {
      const val_2 = convertToDatabaseValue_id(entity.id);
      return getPrimaryKeyHash(val_2);
    }
  },
  'hydrator-session_2000-full-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_55, user_56) {
    // compiled hydrator for entity session ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.expiresAt === null) {
        entity.expiresAt = null;
      } else if (typeof data.expiresAt !== 'undefined') {
        if (data.expiresAt instanceof Date) {
          entity.expiresAt = data.expiresAt;
        } else if (typeof data.expiresAt === 'number' || data.expiresAt.includes('+') || data.expiresAt.lastIndexOf('-') > 10 || data.expiresAt.endsWith('Z')) {
          entity.expiresAt = new Date(data.expiresAt);
        } else {
          entity.expiresAt = new Date(data.expiresAt + 'Z');
        }
      }
      if (data.token === null) {
        entity.token = null;
      } else if (typeof data.token !== 'undefined') {
        entity.token = data.token;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
      if (data.ipAddress === null) {
        entity.ipAddress = null;
      } else if (typeof data.ipAddress !== 'undefined') {
        entity.ipAddress = data.ipAddress;
      }
      if (data.userAgent === null) {
        entity.userAgent = null;
      } else if (typeof data.userAgent !== 'undefined') {
        entity.userAgent = data.userAgent;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_55, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_56, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
    }
  },
  'hydrator-session_2000-full-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_64, user_65) {
    // compiled hydrator for entity session ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.expiresAt === null) {
        entity.expiresAt = null;
      } else if (typeof data.expiresAt !== 'undefined') {
        if (data.expiresAt instanceof Date) {
          entity.expiresAt = data.expiresAt;
        } else if (typeof data.expiresAt === 'number' || data.expiresAt.includes('+') || data.expiresAt.lastIndexOf('-') > 10 || data.expiresAt.endsWith('Z')) {
          entity.expiresAt = new Date(data.expiresAt);
        } else {
          entity.expiresAt = new Date(data.expiresAt + 'Z');
        }
      }
      if (data.token === null) {
        entity.token = null;
      } else if (typeof data.token !== 'undefined') {
        entity.token = data.token;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
      if (data.ipAddress === null) {
        entity.ipAddress = null;
      } else if (typeof data.ipAddress !== 'undefined') {
        entity.ipAddress = data.ipAddress;
      }
      if (data.userAgent === null) {
        entity.userAgent = null;
      } else if (typeof data.userAgent !== 'undefined') {
        entity.userAgent = data.userAgent;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_64, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_65, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
    }
  },
  'comparator-session_2000': function(compareArrays, compareBooleans, compareBuffers, compareObjects, equals) {
    // compiled comparator for entity session
    return function(last, current, options) {
      const diff = {};
      if (current.id === null && last.id === undefined) {
        diff.id = current.id;
      } else if (current.id == null && last.id == null) {
    
      } else if ((current.id != null && last.id == null) || (current.id == null && last.id != null)) {
        diff.id = current.id;
      } else if (last.id !== current.id) {
        diff.id = current.id;
      }
    
      if (current.expiresAt === null && last.expiresAt === undefined) {
        diff.expiresAt = current.expiresAt;
      } else if (current.expiresAt == null && last.expiresAt == null) {
    
      } else if ((current.expiresAt != null && last.expiresAt == null) || (current.expiresAt == null && last.expiresAt != null)) {
        diff.expiresAt = current.expiresAt;
      } else if (last.expiresAt.valueOf() !== current.expiresAt.valueOf()) {
        diff.expiresAt = current.expiresAt;
      }
    
      if (current.token === null && last.token === undefined) {
        diff.token = current.token;
      } else if (current.token == null && last.token == null) {
    
      } else if ((current.token != null && last.token == null) || (current.token == null && last.token != null)) {
        diff.token = current.token;
      } else if (last.token !== current.token) {
        diff.token = current.token;
      }
    
      if (current.createdAt === null && last.createdAt === undefined) {
        diff.createdAt = current.createdAt;
      } else if (current.createdAt == null && last.createdAt == null) {
    
      } else if ((current.createdAt != null && last.createdAt == null) || (current.createdAt == null && last.createdAt != null)) {
        diff.createdAt = current.createdAt;
      } else if (last.createdAt.valueOf() !== current.createdAt.valueOf()) {
        diff.createdAt = current.createdAt;
      }
    
      if (current.updatedAt === null && last.updatedAt === undefined) {
        diff.updatedAt = current.updatedAt;
      } else if (current.updatedAt == null && last.updatedAt == null) {
    
      } else if ((current.updatedAt != null && last.updatedAt == null) || (current.updatedAt == null && last.updatedAt != null)) {
        diff.updatedAt = current.updatedAt;
      } else if (last.updatedAt.valueOf() !== current.updatedAt.valueOf()) {
        diff.updatedAt = current.updatedAt;
      }
    
      if (current.ipAddress === null && last.ipAddress === undefined) {
        diff.ipAddress = current.ipAddress;
      } else if (current.ipAddress == null && last.ipAddress == null) {
    
      } else if ((current.ipAddress != null && last.ipAddress == null) || (current.ipAddress == null && last.ipAddress != null)) {
        diff.ipAddress = current.ipAddress;
      } else if (last.ipAddress !== current.ipAddress) {
        diff.ipAddress = current.ipAddress;
      }
    
      if (current.userAgent === null && last.userAgent === undefined) {
        diff.userAgent = current.userAgent;
      } else if (current.userAgent == null && last.userAgent == null) {
    
      } else if ((current.userAgent != null && last.userAgent == null) || (current.userAgent == null && last.userAgent != null)) {
        diff.userAgent = current.userAgent;
      } else if (last.userAgent !== current.userAgent) {
        diff.userAgent = current.userAgent;
      }
    
      if (current.user === null && last.user === undefined) {
        diff.user = current.user;
      } else if (current.user == null && last.user == null) {
    
      } else if ((current.user != null && last.user == null) || (current.user == null && last.user != null)) {
        diff.user = current.user;
      } else if (last.user !== current.user) {
        diff.user = current.user;
      }
    
    if (options?.includeInverseSides) {
    }
      return diff;
    }
  },
  'snapshotGenerator-session_2000': function(clone, cloneEmbeddable, convertToDatabaseValue_id, processDateProperty, toArray, EntityIdentifier) {
    return function(entity) {
      const ret = {};
      if (typeof entity.id !== 'undefined') {
        ret.id = convertToDatabaseValue_id(entity.id);
      }
    
      if (typeof entity.expiresAt !== 'undefined') {
        ret.expiresAt = clone(processDateProperty(entity.expiresAt));
      }
    
      if (typeof entity.token !== 'undefined') {
        ret.token = entity.token;
      }
    
      if (typeof entity.createdAt !== 'undefined') {
        ret.createdAt = clone(processDateProperty(entity.createdAt));
      }
    
      if (typeof entity.updatedAt !== 'undefined') {
        ret.updatedAt = clone(processDateProperty(entity.updatedAt));
      }
    
      if (typeof entity.ipAddress !== 'undefined') {
        ret.ipAddress = entity.ipAddress;
      }
    
      if (typeof entity.userAgent !== 'undefined') {
        ret.userAgent = entity.userAgent;
      }
    
      if (typeof entity.user !== 'undefined') {
        if (entity.user === null) {
          ret.user = null;
        } else if (entity.user?.__helper.__identifier && !entity.user.__helper.hasPrimaryKey()) {
          ret.user = entity.user?.__helper.__identifier;
        } else if (typeof entity.user !== 'undefined') {
          ret.user = toArray(entity.user.__helper.getPrimaryKey(true));
        }
      }
    
      return ret;
    }
  },
  'resultMapper-session_2000': function(PolymorphicRef, parseDate) {
    // compiled mapper for entity session
    return function(result) {
      const ret = {};
      const mapped = {};
      if (typeof result.id !== 'undefined') {
        ret.id = result.id;
        mapped.id = true;
      }
      if (typeof result.expires_at !== 'undefined') {
        if (result.expires_at == null || result.expires_at instanceof Date) {
          ret.expiresAt = result.expires_at;
        } else if (typeof result.expires_at === 'bigint') {
          ret.expiresAt = parseDate(Number(result.expires_at));
        } else if (typeof result.expires_at === 'number' || result.expires_at.includes('+') || result.expires_at.lastIndexOf('-') > 10 || result.expires_at.endsWith('Z')) {
          ret.expiresAt = parseDate(result.expires_at);
        } else {
          ret.expiresAt = parseDate(result.expires_at + 'Z');
        }
        mapped.expires_at = true;
      }
      if (typeof result.token !== 'undefined') {
        ret.token = result.token;
        mapped.token = true;
      }
      if (typeof result.created_at !== 'undefined') {
        if (result.created_at == null || result.created_at instanceof Date) {
          ret.createdAt = result.created_at;
        } else if (typeof result.created_at === 'bigint') {
          ret.createdAt = parseDate(Number(result.created_at));
        } else if (typeof result.created_at === 'number' || result.created_at.includes('+') || result.created_at.lastIndexOf('-') > 10 || result.created_at.endsWith('Z')) {
          ret.createdAt = parseDate(result.created_at);
        } else {
          ret.createdAt = parseDate(result.created_at + 'Z');
        }
        mapped.created_at = true;
      }
      if (typeof result.updated_at !== 'undefined') {
        if (result.updated_at == null || result.updated_at instanceof Date) {
          ret.updatedAt = result.updated_at;
        } else if (typeof result.updated_at === 'bigint') {
          ret.updatedAt = parseDate(Number(result.updated_at));
        } else if (typeof result.updated_at === 'number' || result.updated_at.includes('+') || result.updated_at.lastIndexOf('-') > 10 || result.updated_at.endsWith('Z')) {
          ret.updatedAt = parseDate(result.updated_at);
        } else {
          ret.updatedAt = parseDate(result.updated_at + 'Z');
        }
        mapped.updated_at = true;
      }
      if (typeof result.ip_address !== 'undefined') {
        ret.ipAddress = result.ip_address;
        mapped.ip_address = true;
      }
      if (typeof result.user_agent !== 'undefined') {
        ret.userAgent = result.user_agent;
        mapped.user_agent = true;
      }
      if (typeof result.user_id !== 'undefined') {
        ret.user = result.user_id;
        mapped.user_id = true;
      }
      for (let k in result) { if (Object.hasOwn(result, k) && !mapped[k] && ret[k] === undefined) ret[k] = result[k]; }
      return ret;
    }
  },
  'hydrator-session_2000-reference-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity session ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'hydrator-session_2000-reference-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity session ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'pkGetter-session_2000': function(isEntityOrRef) {
    // compiled pk getter for entity session
    return function(entity) {
      return entity.id;
    }
  },
  'pkGetterConverted-session_2000': function(isEntityOrRef, convertToDatabaseValue_id) {
    // compiled pk getter (with converted custom types) for entity session
    return function(entity) {
      return convertToDatabaseValue_id(entity.id);
    }
  },
  'pkSerializer-session_2000': function(isEntityOrRef, getCompositeKeyValue, getPrimaryKeyHash, convertToDatabaseValue_id) {
    // compiled pk serializer for entity session
    return function(entity) {
      const val_3 = convertToDatabaseValue_id(entity.id);
      return getPrimaryKeyHash(val_3);
    }
  },
  'hydrator-account_3000-full-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_71, user_72) {
    // compiled hydrator for entity account ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.accountId === null) {
        entity.accountId = null;
      } else if (typeof data.accountId !== 'undefined') {
        entity.accountId = data.accountId;
      }
      if (data.providerId === null) {
        entity.providerId = null;
      } else if (typeof data.providerId !== 'undefined') {
        entity.providerId = data.providerId;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_71, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_72, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
      if (data.accessToken === null) {
        entity.accessToken = null;
      } else if (typeof data.accessToken !== 'undefined') {
        entity.accessToken = data.accessToken;
      }
      if (data.refreshToken === null) {
        entity.refreshToken = null;
      } else if (typeof data.refreshToken !== 'undefined') {
        entity.refreshToken = data.refreshToken;
      }
      if (data.idToken === null) {
        entity.idToken = null;
      } else if (typeof data.idToken !== 'undefined') {
        entity.idToken = data.idToken;
      }
      if (data.accessTokenExpiresAt === null) {
        entity.accessTokenExpiresAt = null;
      } else if (typeof data.accessTokenExpiresAt !== 'undefined') {
        if (data.accessTokenExpiresAt instanceof Date) {
          entity.accessTokenExpiresAt = data.accessTokenExpiresAt;
        } else if (typeof data.accessTokenExpiresAt === 'number' || data.accessTokenExpiresAt.includes('+') || data.accessTokenExpiresAt.lastIndexOf('-') > 10 || data.accessTokenExpiresAt.endsWith('Z')) {
          entity.accessTokenExpiresAt = new Date(data.accessTokenExpiresAt);
        } else {
          entity.accessTokenExpiresAt = new Date(data.accessTokenExpiresAt + 'Z');
        }
      }
      if (data.refreshTokenExpiresAt === null) {
        entity.refreshTokenExpiresAt = null;
      } else if (typeof data.refreshTokenExpiresAt !== 'undefined') {
        if (data.refreshTokenExpiresAt instanceof Date) {
          entity.refreshTokenExpiresAt = data.refreshTokenExpiresAt;
        } else if (typeof data.refreshTokenExpiresAt === 'number' || data.refreshTokenExpiresAt.includes('+') || data.refreshTokenExpiresAt.lastIndexOf('-') > 10 || data.refreshTokenExpiresAt.endsWith('Z')) {
          entity.refreshTokenExpiresAt = new Date(data.refreshTokenExpiresAt);
        } else {
          entity.refreshTokenExpiresAt = new Date(data.refreshTokenExpiresAt + 'Z');
        }
      }
      if (data.scope === null) {
        entity.scope = null;
      } else if (typeof data.scope !== 'undefined') {
        entity.scope = data.scope;
      }
      if (data.password === null) {
        entity.password = null;
      } else if (typeof data.password !== 'undefined') {
        entity.password = data.password;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
    }
  },
  'hydrator-account_3000-full-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id, user_85, user_86) {
    // compiled hydrator for entity account ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
      if (data.accountId === null) {
        entity.accountId = null;
      } else if (typeof data.accountId !== 'undefined') {
        entity.accountId = data.accountId;
      }
      if (data.providerId === null) {
        entity.providerId = null;
      } else if (typeof data.providerId !== 'undefined') {
        entity.providerId = data.providerId;
      }
      if (data.user === null) {
        entity.user = null;
      } else if (typeof data.user !== 'undefined') {
        if (isPrimaryKey(data.user, true)) {
          entity.user = factory.createReference(user_85, data.user, { merge: true, convertCustomTypes, normalizeAccessors, schema });
        } else if (data.user && typeof data.user === 'object') {
          entity.user = factory.create(user_86, data.user, { initialized: true, merge: true, newEntity, convertCustomTypes, normalizeAccessors, schema });
        }
      }
      if (data.accessToken === null) {
        entity.accessToken = null;
      } else if (typeof data.accessToken !== 'undefined') {
        entity.accessToken = data.accessToken;
      }
      if (data.refreshToken === null) {
        entity.refreshToken = null;
      } else if (typeof data.refreshToken !== 'undefined') {
        entity.refreshToken = data.refreshToken;
      }
      if (data.idToken === null) {
        entity.idToken = null;
      } else if (typeof data.idToken !== 'undefined') {
        entity.idToken = data.idToken;
      }
      if (data.accessTokenExpiresAt === null) {
        entity.accessTokenExpiresAt = null;
      } else if (typeof data.accessTokenExpiresAt !== 'undefined') {
        if (data.accessTokenExpiresAt instanceof Date) {
          entity.accessTokenExpiresAt = data.accessTokenExpiresAt;
        } else if (typeof data.accessTokenExpiresAt === 'number' || data.accessTokenExpiresAt.includes('+') || data.accessTokenExpiresAt.lastIndexOf('-') > 10 || data.accessTokenExpiresAt.endsWith('Z')) {
          entity.accessTokenExpiresAt = new Date(data.accessTokenExpiresAt);
        } else {
          entity.accessTokenExpiresAt = new Date(data.accessTokenExpiresAt + 'Z');
        }
      }
      if (data.refreshTokenExpiresAt === null) {
        entity.refreshTokenExpiresAt = null;
      } else if (typeof data.refreshTokenExpiresAt !== 'undefined') {
        if (data.refreshTokenExpiresAt instanceof Date) {
          entity.refreshTokenExpiresAt = data.refreshTokenExpiresAt;
        } else if (typeof data.refreshTokenExpiresAt === 'number' || data.refreshTokenExpiresAt.includes('+') || data.refreshTokenExpiresAt.lastIndexOf('-') > 10 || data.refreshTokenExpiresAt.endsWith('Z')) {
          entity.refreshTokenExpiresAt = new Date(data.refreshTokenExpiresAt);
        } else {
          entity.refreshTokenExpiresAt = new Date(data.refreshTokenExpiresAt + 'Z');
        }
      }
      if (data.scope === null) {
        entity.scope = null;
      } else if (typeof data.scope !== 'undefined') {
        entity.scope = data.scope;
      }
      if (data.password === null) {
        entity.password = null;
      } else if (typeof data.password !== 'undefined') {
        entity.password = data.password;
      }
      if (data.createdAt === null) {
        entity.createdAt = null;
      } else if (typeof data.createdAt !== 'undefined') {
        if (data.createdAt instanceof Date) {
          entity.createdAt = data.createdAt;
        } else if (typeof data.createdAt === 'number' || data.createdAt.includes('+') || data.createdAt.lastIndexOf('-') > 10 || data.createdAt.endsWith('Z')) {
          entity.createdAt = new Date(data.createdAt);
        } else {
          entity.createdAt = new Date(data.createdAt + 'Z');
        }
      }
      if (data.updatedAt === null) {
        entity.updatedAt = null;
      } else if (typeof data.updatedAt !== 'undefined') {
        if (data.updatedAt instanceof Date) {
          entity.updatedAt = data.updatedAt;
        } else if (typeof data.updatedAt === 'number' || data.updatedAt.includes('+') || data.updatedAt.lastIndexOf('-') > 10 || data.updatedAt.endsWith('Z')) {
          entity.updatedAt = new Date(data.updatedAt);
        } else {
          entity.updatedAt = new Date(data.updatedAt + 'Z');
        }
      }
    }
  },
  'comparator-account_3000': function(compareArrays, compareBooleans, compareBuffers, compareObjects, equals) {
    // compiled comparator for entity account
    return function(last, current, options) {
      const diff = {};
      if (current.id === null && last.id === undefined) {
        diff.id = current.id;
      } else if (current.id == null && last.id == null) {
    
      } else if ((current.id != null && last.id == null) || (current.id == null && last.id != null)) {
        diff.id = current.id;
      } else if (last.id !== current.id) {
        diff.id = current.id;
      }
    
      if (current.accountId === null && last.accountId === undefined) {
        diff.accountId = current.accountId;
      } else if (current.accountId == null && last.accountId == null) {
    
      } else if ((current.accountId != null && last.accountId == null) || (current.accountId == null && last.accountId != null)) {
        diff.accountId = current.accountId;
      } else if (last.accountId !== current.accountId) {
        diff.accountId = current.accountId;
      }
    
      if (current.providerId === null && last.providerId === undefined) {
        diff.providerId = current.providerId;
      } else if (current.providerId == null && last.providerId == null) {
    
      } else if ((current.providerId != null && last.providerId == null) || (current.providerId == null && last.providerId != null)) {
        diff.providerId = current.providerId;
      } else if (last.providerId !== current.providerId) {
        diff.providerId = current.providerId;
      }
    
      if (current.user === null && last.user === undefined) {
        diff.user = current.user;
      } else if (current.user == null && last.user == null) {
    
      } else if ((current.user != null && last.user == null) || (current.user == null && last.user != null)) {
        diff.user = current.user;
      } else if (last.user !== current.user) {
        diff.user = current.user;
      }
    
      if (current.accessToken === null && last.accessToken === undefined) {
        diff.accessToken = current.accessToken;
      } else if (current.accessToken == null && last.accessToken == null) {
    
      } else if ((current.accessToken != null && last.accessToken == null) || (current.accessToken == null && last.accessToken != null)) {
        diff.accessToken = current.accessToken;
      } else if (last.accessToken !== current.accessToken) {
        diff.accessToken = current.accessToken;
      }
    
      if (current.refreshToken === null && last.refreshToken === undefined) {
        diff.refreshToken = current.refreshToken;
      } else if (current.refreshToken == null && last.refreshToken == null) {
    
      } else if ((current.refreshToken != null && last.refreshToken == null) || (current.refreshToken == null && last.refreshToken != null)) {
        diff.refreshToken = current.refreshToken;
      } else if (last.refreshToken !== current.refreshToken) {
        diff.refreshToken = current.refreshToken;
      }
    
      if (current.idToken === null && last.idToken === undefined) {
        diff.idToken = current.idToken;
      } else if (current.idToken == null && last.idToken == null) {
    
      } else if ((current.idToken != null && last.idToken == null) || (current.idToken == null && last.idToken != null)) {
        diff.idToken = current.idToken;
      } else if (last.idToken !== current.idToken) {
        diff.idToken = current.idToken;
      }
    
      if (current.accessTokenExpiresAt === null && last.accessTokenExpiresAt === undefined) {
        diff.accessTokenExpiresAt = current.accessTokenExpiresAt;
      } else if (current.accessTokenExpiresAt == null && last.accessTokenExpiresAt == null) {
    
      } else if ((current.accessTokenExpiresAt != null && last.accessTokenExpiresAt == null) || (current.accessTokenExpiresAt == null && last.accessTokenExpiresAt != null)) {
        diff.accessTokenExpiresAt = current.accessTokenExpiresAt;
      } else if (last.accessTokenExpiresAt.valueOf() !== current.accessTokenExpiresAt.valueOf()) {
        diff.accessTokenExpiresAt = current.accessTokenExpiresAt;
      }
    
      if (current.refreshTokenExpiresAt === null && last.refreshTokenExpiresAt === undefined) {
        diff.refreshTokenExpiresAt = current.refreshTokenExpiresAt;
      } else if (current.refreshTokenExpiresAt == null && last.refreshTokenExpiresAt == null) {
    
      } else if ((current.refreshTokenExpiresAt != null && last.refreshTokenExpiresAt == null) || (current.refreshTokenExpiresAt == null && last.refreshTokenExpiresAt != null)) {
        diff.refreshTokenExpiresAt = current.refreshTokenExpiresAt;
      } else if (last.refreshTokenExpiresAt.valueOf() !== current.refreshTokenExpiresAt.valueOf()) {
        diff.refreshTokenExpiresAt = current.refreshTokenExpiresAt;
      }
    
      if (current.scope === null && last.scope === undefined) {
        diff.scope = current.scope;
      } else if (current.scope == null && last.scope == null) {
    
      } else if ((current.scope != null && last.scope == null) || (current.scope == null && last.scope != null)) {
        diff.scope = current.scope;
      } else if (last.scope !== current.scope) {
        diff.scope = current.scope;
      }
    
      if (current.password === null && last.password === undefined) {
        diff.password = current.password;
      } else if (current.password == null && last.password == null) {
    
      } else if ((current.password != null && last.password == null) || (current.password == null && last.password != null)) {
        diff.password = current.password;
      } else if (last.password !== current.password) {
        diff.password = current.password;
      }
    
      if (current.createdAt === null && last.createdAt === undefined) {
        diff.createdAt = current.createdAt;
      } else if (current.createdAt == null && last.createdAt == null) {
    
      } else if ((current.createdAt != null && last.createdAt == null) || (current.createdAt == null && last.createdAt != null)) {
        diff.createdAt = current.createdAt;
      } else if (last.createdAt.valueOf() !== current.createdAt.valueOf()) {
        diff.createdAt = current.createdAt;
      }
    
      if (current.updatedAt === null && last.updatedAt === undefined) {
        diff.updatedAt = current.updatedAt;
      } else if (current.updatedAt == null && last.updatedAt == null) {
    
      } else if ((current.updatedAt != null && last.updatedAt == null) || (current.updatedAt == null && last.updatedAt != null)) {
        diff.updatedAt = current.updatedAt;
      } else if (last.updatedAt.valueOf() !== current.updatedAt.valueOf()) {
        diff.updatedAt = current.updatedAt;
      }
    
    if (options?.includeInverseSides) {
    }
      return diff;
    }
  },
  'snapshotGenerator-account_3000': function(clone, cloneEmbeddable, convertToDatabaseValue_id, toArray, EntityIdentifier, processDateProperty) {
    return function(entity) {
      const ret = {};
      if (typeof entity.id !== 'undefined') {
        ret.id = convertToDatabaseValue_id(entity.id);
      }
    
      if (typeof entity.accountId !== 'undefined') {
        ret.accountId = entity.accountId;
      }
    
      if (typeof entity.providerId !== 'undefined') {
        ret.providerId = entity.providerId;
      }
    
      if (typeof entity.user !== 'undefined') {
        if (entity.user === null) {
          ret.user = null;
        } else if (entity.user?.__helper.__identifier && !entity.user.__helper.hasPrimaryKey()) {
          ret.user = entity.user?.__helper.__identifier;
        } else if (typeof entity.user !== 'undefined') {
          ret.user = toArray(entity.user.__helper.getPrimaryKey(true));
        }
      }
    
      if (typeof entity.accessToken !== 'undefined') {
        ret.accessToken = entity.accessToken;
      }
    
      if (typeof entity.refreshToken !== 'undefined') {
        ret.refreshToken = entity.refreshToken;
      }
    
      if (typeof entity.idToken !== 'undefined') {
        ret.idToken = entity.idToken;
      }
    
      if (typeof entity.accessTokenExpiresAt !== 'undefined') {
        ret.accessTokenExpiresAt = clone(processDateProperty(entity.accessTokenExpiresAt));
      }
    
      if (typeof entity.refreshTokenExpiresAt !== 'undefined') {
        ret.refreshTokenExpiresAt = clone(processDateProperty(entity.refreshTokenExpiresAt));
      }
    
      if (typeof entity.scope !== 'undefined') {
        ret.scope = entity.scope;
      }
    
      if (typeof entity.password !== 'undefined') {
        ret.password = entity.password;
      }
    
      if (typeof entity.createdAt !== 'undefined') {
        ret.createdAt = clone(processDateProperty(entity.createdAt));
      }
    
      if (typeof entity.updatedAt !== 'undefined') {
        ret.updatedAt = clone(processDateProperty(entity.updatedAt));
      }
    
      return ret;
    }
  },
  'resultMapper-account_3000': function(PolymorphicRef, parseDate) {
    // compiled mapper for entity account
    return function(result) {
      const ret = {};
      const mapped = {};
      if (typeof result.id !== 'undefined') {
        ret.id = result.id;
        mapped.id = true;
      }
      if (typeof result.account_id !== 'undefined') {
        ret.accountId = result.account_id;
        mapped.account_id = true;
      }
      if (typeof result.provider_id !== 'undefined') {
        ret.providerId = result.provider_id;
        mapped.provider_id = true;
      }
      if (typeof result.user_id !== 'undefined') {
        ret.user = result.user_id;
        mapped.user_id = true;
      }
      if (typeof result.access_token !== 'undefined') {
        ret.accessToken = result.access_token;
        mapped.access_token = true;
      }
      if (typeof result.refresh_token !== 'undefined') {
        ret.refreshToken = result.refresh_token;
        mapped.refresh_token = true;
      }
      if (typeof result.id_token !== 'undefined') {
        ret.idToken = result.id_token;
        mapped.id_token = true;
      }
      if (typeof result.access_token_expires_at !== 'undefined') {
        if (result.access_token_expires_at == null || result.access_token_expires_at instanceof Date) {
          ret.accessTokenExpiresAt = result.access_token_expires_at;
        } else if (typeof result.access_token_expires_at === 'bigint') {
          ret.accessTokenExpiresAt = parseDate(Number(result.access_token_expires_at));
        } else if (typeof result.access_token_expires_at === 'number' || result.access_token_expires_at.includes('+') || result.access_token_expires_at.lastIndexOf('-') > 10 || result.access_token_expires_at.endsWith('Z')) {
          ret.accessTokenExpiresAt = parseDate(result.access_token_expires_at);
        } else {
          ret.accessTokenExpiresAt = parseDate(result.access_token_expires_at + 'Z');
        }
        mapped.access_token_expires_at = true;
      }
      if (typeof result.refresh_token_expires_at !== 'undefined') {
        if (result.refresh_token_expires_at == null || result.refresh_token_expires_at instanceof Date) {
          ret.refreshTokenExpiresAt = result.refresh_token_expires_at;
        } else if (typeof result.refresh_token_expires_at === 'bigint') {
          ret.refreshTokenExpiresAt = parseDate(Number(result.refresh_token_expires_at));
        } else if (typeof result.refresh_token_expires_at === 'number' || result.refresh_token_expires_at.includes('+') || result.refresh_token_expires_at.lastIndexOf('-') > 10 || result.refresh_token_expires_at.endsWith('Z')) {
          ret.refreshTokenExpiresAt = parseDate(result.refresh_token_expires_at);
        } else {
          ret.refreshTokenExpiresAt = parseDate(result.refresh_token_expires_at + 'Z');
        }
        mapped.refresh_token_expires_at = true;
      }
      if (typeof result.scope !== 'undefined') {
        ret.scope = result.scope;
        mapped.scope = true;
      }
      if (typeof result.password !== 'undefined') {
        ret.password = result.password;
        mapped.password = true;
      }
      if (typeof result.created_at !== 'undefined') {
        if (result.created_at == null || result.created_at instanceof Date) {
          ret.createdAt = result.created_at;
        } else if (typeof result.created_at === 'bigint') {
          ret.createdAt = parseDate(Number(result.created_at));
        } else if (typeof result.created_at === 'number' || result.created_at.includes('+') || result.created_at.lastIndexOf('-') > 10 || result.created_at.endsWith('Z')) {
          ret.createdAt = parseDate(result.created_at);
        } else {
          ret.createdAt = parseDate(result.created_at + 'Z');
        }
        mapped.created_at = true;
      }
      if (typeof result.updated_at !== 'undefined') {
        if (result.updated_at == null || result.updated_at instanceof Date) {
          ret.updatedAt = result.updated_at;
        } else if (typeof result.updated_at === 'bigint') {
          ret.updatedAt = parseDate(Number(result.updated_at));
        } else if (typeof result.updated_at === 'number' || result.updated_at.includes('+') || result.updated_at.lastIndexOf('-') > 10 || result.updated_at.endsWith('Z')) {
          ret.updatedAt = parseDate(result.updated_at);
        } else {
          ret.updatedAt = parseDate(result.updated_at + 'Z');
        }
        mapped.updated_at = true;
      }
      for (let k in result) { if (Object.hasOwn(result, k) && !mapped[k] && ret[k] === undefined) ret[k] = result[k]; }
      return ret;
    }
  },
  'hydrator-account_3000-reference-false': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity account ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'hydrator-account_3000-reference-true': function(isPrimaryKey, isEntity, isScalarReference, Collection, Reference, PolymorphicRef, ValidationError, convertToJSValue_id, convertToDatabaseValue_id) {
    // compiled hydrator for entity account ( normalized)
    return function(entity, data, factory, newEntity, convertCustomTypes, schema, parentSchema, normalizeAccessors) {
      if (data.id === null) {
        entity.id = null;
      } else if (typeof data.id !== 'undefined') {
        if (convertCustomTypes) {
          const value = convertToJSValue_id(data.id);
          entity.id = value;
        } else {
          entity.id = data.id;
        }
      }
    }
  },
  'pkGetter-account_3000': function(isEntityOrRef) {
    // compiled pk getter for entity account
    return function(entity) {
      return entity.id;
    }
  },
  'pkGetterConverted-account_3000': function(isEntityOrRef, convertToDatabaseValue_id) {
    // compiled pk getter (with converted custom types) for entity account
    return function(entity) {
      return convertToDatabaseValue_id(entity.id);
    }
  },
  'pkSerializer-account_3000': function(isEntityOrRef, getCompositeKeyValue, getPrimaryKeyHash, convertToDatabaseValue_id) {
    // compiled pk serializer for entity account
    return function(entity) {
      const val_4 = convertToDatabaseValue_id(entity.id);
      return getPrimaryKeyHash(val_4);
    }
  }
};
