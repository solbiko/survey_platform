package com.cloud.auth.repository;

import com.cloud.auth.entity.User;
import com.cloud.auth.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserGroupRepository extends JpaRepository<UserGroup, Integer> {

    // 해당 그룹 참여자 리스트 조회
    @Query("SELECT ug.user FROM UserGroup ug WHERE ug.group.groupId= :groupId")
    List<User> userList(Integer groupId);
}
